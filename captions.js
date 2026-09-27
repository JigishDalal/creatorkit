/**
 * captions.js
 * Logic for the AI Video Captions Studio
 */

let currentTranscript = [];
let videoElement = null;
let overlayElement = null;

document.addEventListener('DOMContentLoaded', () => {
  videoElement = document.getElementById('captionsVideoPreview');
  overlayElement = document.getElementById('captionOverlay');
  
  // Update animation style when changed
  document.getElementById('animationStyleSelect').addEventListener('change', (e) => {
    overlayElement.className = 'caption-overlay ' + e.target.value;
  });
  
  // Update position when changed
  document.getElementById('captionPositionSelect').addEventListener('change', (e) => {
    const val = e.target.value;
    if (val === 'top') {
      overlayElement.style.top = '15%';
    } else if (val === 'bottom') {
      overlayElement.style.top = '85%';
    } else {
      overlayElement.style.top = '50%';
    }
  });
  
  // Listen to video time updates to sync captions
  if (videoElement) {
    videoElement.addEventListener('timeupdate', syncCaptions);
  }
  
});

async function generateCaptions() {
  const fileInput = document.getElementById('videoUploadInput');
  const resultContainer = document.getElementById('captionsResultContainer');
  const generateBtn = document.getElementById('generateCaptionsBtn');
  
  if (!fileInput.files || fileInput.files.length === 0) {
    if (typeof showToast === 'function') {
      showToast('Please upload a video file first', 'error');
    } else {
      alert('Please upload a video file first');
    }
    return;
  }
  
  const file = fileInput.files[0];
  
  // Create object URL for local preview
  const videoUrl = URL.createObjectURL(file);
  videoElement.src = videoUrl;
  resultContainer.style.display = 'block';
  
  generateBtn.innerHTML = '<span class="btn-icon">⏳</span> Loading AI Model (This may take a minute)...';
  generateBtn.disabled = true;
  overlayElement.innerHTML = '<div class="loading-text">Loading AI Model (This may take a minute)...</div>';
  
  try {
    // 1. Initialize Model
    const initResponse = await fetch('/api/init_model', { method: 'POST' });
    const initData = await initResponse.json();
    if (!initData.success) {
      throw new Error(initData.error || 'Failed to initialize AI model');
    }

    // 2. Transcribe
    generateBtn.innerHTML = '<span class="btn-icon">⏳</span> Uploading & Transcribing...';
    overlayElement.innerHTML = '<div class="loading-text">Generating captions (this may take a minute)...</div>';

    const formData = new FormData();
    formData.append('video', file);
    
    // Call our Python backend to transcribe
    const response = await fetch('/api/transcribe', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    // Save transcript and reset overlay
    currentTranscript = data.words || [];
    overlayElement.innerHTML = '';
    
    if (typeof showToast === 'function') {
      showToast('Captions generated successfully!', 'success');
    }
    
    // Render the editable transcript
    renderTranscriptEditor();
    
    // Auto-play the video to show captions
    videoElement.play();
    
  } catch (error) {
    console.error('Error generating captions:', error);
    overlayElement.innerHTML = '<div class="error-text" style="color:red; background:rgba(0,0,0,0.7); padding:10px;">Failed to generate captions.</div>';
    if (typeof showToast === 'function') {
      showToast('Error: ' + error.message, 'error');
    }
  } finally {
    generateBtn.innerHTML = '<span class="btn-icon">✨</span> Generate Captions';
    generateBtn.disabled = false;
  }
}

function syncCaptions() {
  if (!currentTranscript || currentTranscript.length === 0) return;
  
  const currentTime = videoElement.currentTime;
  
  // Find words that should be visible at this time (allow a small window of context)
  // Standard shorts/reels show a few words at a time. Let's show up to 3-5 words 
  // that are close to the current time to form a readable chunk.
  
  // First, find the exact active word
  const activeWordIndex = currentTranscript.findIndex(
    w => currentTime >= w.start && currentTime <= w.end
  );
  
  if (activeWordIndex === -1) {
    // If we are between words, maybe clear or keep the last one if it just ended
    // For now, let's keep it visible for a tiny bit longer (0.5s padding)
    const recentlyEndedWord = currentTranscript.find(
      w => currentTime > w.end && currentTime < w.end + 0.5
    );
    if (!recentlyEndedWord) {
        overlayElement.innerHTML = '';
    }
    return;
  }
  
  // Display a chunk of words around the active word (e.g. up to 4 words)
  // We'll take the current word and maybe the next 2 words if they are close
  let chunkStartIndex = Math.max(0, activeWordIndex - 1);
  let chunkEndIndex = Math.min(currentTranscript.length - 1, activeWordIndex + 2);
  
  let html = '';
  for (let i = chunkStartIndex; i <= chunkEndIndex; i++) {
    const wordData = currentTranscript[i];
    const isActive = (i === activeWordIndex);
    
    // We add CSS classes based on status
    const classes = ['caption-word'];
    if (isActive) classes.push('active');
    else if (i < activeWordIndex) classes.push('past');
    else classes.push('future');
    
    html += `<span class="${classes.join(' ')}">${wordData.word}</span> `;
  }
  
  overlayElement.innerHTML = html.trim();
}

function renderTranscriptEditor() {
  const editorContainer = document.getElementById('transcriptEditor');
  if (!editorContainer) return;
  
  editorContainer.innerHTML = '';
  
  if (!currentTranscript || currentTranscript.length === 0) {
    editorContainer.innerHTML = '<span style="color:var(--text-muted)">No transcript available.</span>';
    return;
  }
  
  currentTranscript.forEach((wordData, index) => {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = wordData.word;
    input.className = 'transcript-word-input';
    input.dataset.index = index;
    
    // Update the array when the user types
    input.addEventListener('input', (e) => {
      const val = e.target.value;
      const idx = parseInt(e.target.dataset.index, 10);
      if (!isNaN(idx) && currentTranscript[idx]) {
        currentTranscript[idx].word = val;
      }
    });
    
    // Auto-seek the video when a word is clicked
    input.addEventListener('focus', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      if (!isNaN(idx) && currentTranscript[idx]) {
        videoElement.currentTime = currentTranscript[idx].start;
      }
    });
    
    editorContainer.appendChild(input);
  });
}

// ---------------------------------------------------------
// EXPORT LOGIC
// ---------------------------------------------------------

async function exportVideoBackend() {
  const fileInput = document.getElementById('videoUploadInput');
  const statusEl = document.getElementById('exportStatus');
  const btn = document.getElementById('exportBackendBtn');
  
  if (!fileInput.files || fileInput.files.length === 0 || !currentTranscript.length) {
    if (typeof showToast === 'function') showToast('Generate captions first!', 'error');
    return;
  }
  
  statusEl.textContent = 'Uploading to server and burning subtitles... This may take a minute depending on video length.';
  btn.disabled = true;
  
  try {
    const formData = new FormData();
    formData.append('video', fileInput.files[0]);
    formData.append('transcript', JSON.stringify(currentTranscript));
    
    // Send position setting
    const pos = document.getElementById('captionPositionSelect').value;
    formData.append('position', pos);
    
    const response = await fetch('/api/export', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`Export failed: ${response.statusText}`);
    }
    
    // Download the returned video blob
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'captioned_video_hq.mp4';
    document.body.appendChild(a);
    a.click();
    a.remove();
    
    statusEl.textContent = 'HQ Export complete!';
    if (typeof showToast === 'function') showToast('Export Complete!', 'success');
  } catch (err) {
    console.error(err);
    statusEl.textContent = 'Error: ' + err.message;
  } finally {
    btn.disabled = false;
  }
}

async function exportVideoFrontend() {
  const statusEl = document.getElementById('exportStatus');
  const btn = document.getElementById('exportFrontendBtn');
  
  if (!videoElement || !currentTranscript.length) {
    if (typeof showToast === 'function') showToast('Generate captions first!', 'error');
    return;
  }
  
  statusEl.textContent = 'Recording video in browser... Please wait.';
  btn.disabled = true;
  
  try {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth || 1280;
    canvas.height = videoElement.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    
    const stream = canvas.captureStream(30);
    
    // Attempt to capture audio from the video element
    let audioStream = null;
    if (videoElement.captureStream) {
      audioStream = videoElement.captureStream();
    } else if (videoElement.mozCaptureStream) {
      audioStream = videoElement.mozCaptureStream();
    }
    
    if (audioStream && audioStream.getAudioTracks().length > 0) {
      stream.addTrack(audioStream.getAudioTracks()[0]);
    } else {
      console.warn("Could not capture audio tracks from video element.");
    }
    
    let options = { mimeType: 'video/webm;codecs=vp9' };
    let ext = 'webm';
    
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      // Prioritize mp4 over vp8 as Safari incorrectly reports vp8 support but fails to mux audio
      if (MediaRecorder.isTypeSupported('video/mp4')) {
        options = { mimeType: 'video/mp4' };
        ext = 'mp4';
      } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
        options = { mimeType: 'video/webm;codecs=vp8' };
      } else if (MediaRecorder.isTypeSupported('video/webm')) {
        options = { mimeType: 'video/webm' };
      } else {
        options = {}; // Browser default
        ext = 'mp4';
      }
    }
    
    let recorder = new MediaRecorder(stream, options);
    const chunks = [];
    
    recorder.ondataavailable = e => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    
    let onstopHandler = () => {
      const mimeType = options.mimeType || 'video/mp4';
      const blob = new Blob(chunks, { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `captioned_video_fast.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
      
      statusEl.textContent = 'Browser Export complete!';
      if (typeof showToast === 'function') showToast('Export Complete!', 'success');
      btn.disabled = false;
    };
    recorder.onstop = onstopHandler;
    
    // Start recording and playback
    try {
      recorder.start();
    } catch (e) {
      console.warn("Failed to start with options", options, "trying default.", e);
      // Fallback for Safari audio muxing issues
      recorder = new MediaRecorder(stream);
      recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
      recorder.onstop = onstopHandler;
      recorder.start();
    }
    videoElement.currentTime = 0;
    await videoElement.play();
    
    const position = document.getElementById('captionPositionSelect').value;
    
    function drawFrame() {
      if (videoElement.paused || videoElement.ended) {
        if (recorder.state === 'recording') {
          recorder.stop();
        }
        return;
      }
      
      // Update progress
      if (videoElement.duration) {
        const percent = Math.min(100, Math.round((videoElement.currentTime / videoElement.duration) * 100));
        statusEl.textContent = `Recording video in browser... ${percent}% complete. Please wait.`;
      }
      
      // Draw video frame
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      
      // Find active word with 0.5s padding (same as live preview)
      const time = videoElement.currentTime;
      let activeWord = null;
      
      const activeWordIndex = currentTranscript.findIndex(
        w => time >= w.start && time <= w.end
      );
      
      if (activeWordIndex !== -1) {
        activeWord = currentTranscript[activeWordIndex].word;
      } else {
        const recentlyEndedWord = currentTranscript.find(
          w => time > w.end && time < w.end + 0.5
        );
        if (recentlyEndedWord) {
          activeWord = recentlyEndedWord.word;
        }
      }
      
      // Draw active word
      if (activeWord) {
        // Dynamically scale font size based on video resolution
        const fontSize = Math.max(36, Math.floor(canvas.height / 12));
        ctx.font = `bold ${fontSize}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        let y = canvas.height / 2;
        if (position === 'bottom') y = canvas.height - (fontSize * 1.5);
        if (position === 'top') y = fontSize * 1.5;
        
        // Draw black stroke/shadow
        ctx.strokeStyle = 'black';
        ctx.lineWidth = Math.max(4, Math.floor(fontSize / 8));
        ctx.strokeText(activeWord, canvas.width / 2, y);
        
        // Draw white text
        ctx.fillStyle = 'white';
        ctx.fillText(activeWord, canvas.width / 2, y);
      }
      
      requestAnimationFrame(drawFrame);
    }
    
    requestAnimationFrame(drawFrame);
    
    // Also stop if video ends naturally
    videoElement.onended = () => {
      if (recorder.state === 'recording') {
        recorder.stop();
      }
    };
    
  } catch (err) {
    console.error(err);
    statusEl.textContent = 'Error: ' + err.message;
    btn.disabled = false;
  }
}
