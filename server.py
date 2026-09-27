import os
import json
import subprocess
import tempfile
from flask import Flask, request, jsonify, send_from_directory, send_file
from werkzeug.utils import secure_filename
import whisper

app = Flask(__name__, static_folder='.', static_url_path='')

# Configuration
UPLOAD_FOLDER = tempfile.gettempdir()
ALLOWED_EXTENSIONS = {'mp4', 'm4v', 'mov', 'avi', 'mkv'}

# Load whisper model (lazy load to speed up initial startup)
model = None

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/api/status', methods=['GET'])
def get_status():
    global model
    return jsonify({'model_loaded': model is not None})

@app.route('/api/init_model', methods=['POST'])
def init_model():
    global model
    if model is None:
        try:
            print("Loading Whisper model...")
            model = whisper.load_model("base")
            print("Model loaded.")
            return jsonify({'success': True, 'message': 'Model loaded successfully'})
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500
    return jsonify({'success': True, 'message': 'Model was already loaded'})

@app.route('/api/transcribe', methods=['POST'])
def transcribe_video():
    global model
    
    if 'video' not in request.files:
        return jsonify({'error': 'No video file provided'}), 400
        
    file = request.files['video']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
        
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        
        try:
            if model is None:
                return jsonify({'error': 'AI Model is not loaded. Please initialize the model first.'}), 400
            
            print(f"Transcribing {filepath}...")
            # Transcribe with word-level timestamps
            result = model.transcribe(filepath, word_timestamps=True)
            
            # Format the output to just return the words and timestamps
            words_data = []
            for segment in result.get('segments', []):
                for word in segment.get('words', []):
                    words_data.append({
                        'word': word['word'].strip(),
                        'start': word['start'],
                        'end': word['end']
                    })
                    
            # Clean up temporary file
            os.remove(filepath)
            
            return jsonify({
                'text': result['text'],
                'words': words_data
            })
            
        except Exception as e:
            if os.path.exists(filepath):
                os.remove(filepath)
            return jsonify({'error': str(e)}), 500
            
    return jsonify({'error': 'Invalid file format'}), 400

def generate_srt(words, filepath):
    # Generates a simple SRT file from the words array
    with open(filepath, 'w', encoding='utf-8') as f:
        for i, w in enumerate(words):
            start = format_srt_time(float(w['start']))
            end = format_srt_time(float(w['end']))
            text = w['word']
            f.write(f"{i+1}\n{start} --> {end}\n{text}\n\n")

def format_srt_time(seconds):
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    msecs = int((seconds - int(seconds)) * 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{msecs:03d}"

@app.route('/api/export', methods=['POST'])
def export_video():
    if 'video' not in request.files or 'transcript' not in request.form:
        return jsonify({'error': 'Missing video or transcript'}), 400
        
    file = request.files['video']
    transcript_json = request.form['transcript']
    position = request.form.get('position', 'center')
    
    # Map UI position to ASS alignment (2=bottom, 5=center, 8=top)
    alignment = 5
    if position == 'bottom':
        alignment = 2
    elif position == 'top':
        alignment = 8
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
        
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        input_path = os.path.join(UPLOAD_FOLDER, "input_" + filename)
        srt_path = os.path.join(UPLOAD_FOLDER, "subs.srt")
        output_path = os.path.join(UPLOAD_FOLDER, "output_" + filename)
        
        file.save(input_path)
        
        try:
            transcript = json.loads(transcript_json)
            generate_srt(transcript, srt_path)
            
            # Use ffmpeg to burn subtitles
            # Note: requires ffmpeg to be compiled with libass/subtitles filter
            cmd = [
                'ffmpeg', '-y', '-i', input_path,
                '-vf', f"subtitles={srt_path}:force_style='FontSize=24,PrimaryColour=&H00FFFFFF,Alignment={alignment}'",
                '-c:a', 'copy', output_path
            ]
            
            print("Running FFmpeg:", " ".join(cmd))
            subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            
            # Send file back
            return send_file(output_path, as_attachment=True, download_name="captioned_video.mp4")
            
        except Exception as e:
            print("Export error:", e)
            return jsonify({'error': str(e)}), 500
        finally:
            # Cleanup
            for p in [input_path, srt_path, output_path]:
                if os.path.exists(p):
                    try:
                        os.remove(p)
                    except:
                        pass
                        
    return jsonify({'error': 'Invalid file format'}), 400

if __name__ == '__main__':
    print("Starting Flask server on port 8000...")
    app.run(host='0.0.0.0', port=8000, debug=True)
