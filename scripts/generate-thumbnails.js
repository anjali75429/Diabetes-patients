const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

// Optional: Set path to ffmpeg binary if not in system PATH
// ffmpeg.setFfmpegPath('C:/path/to/ffmpeg.exe');

const videos = [
  {
    input: 'D:/Diabetes patients/frontend/public/videos/diabetic-checkup-animated.mp4',
    output: 'D:/Diabetes patients/frontend/public/images/video-thumbnail-1.jpg'
  },
  {
    input: 'D:/Diabetes patients/frontend/public/videos/healthy-eating-for-diabetes.mp4',
    output: 'D:/Diabetes patients/frontend/public/images/healthy-eating-thumbnail.jpg'
  }
];

function createThumbnail(video) {
  return new Promise((resolve, reject) => {
    const inputPath = video.input;
    const outputFolder = path.dirname(video.output);
    const outputFilename = path.basename(video.output);

    // Ensure output directory exists
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }

    ffmpeg(inputPath)
      .on('end', () => {
        console.log(`✅ Thumbnail created: ${outputFilename}`);
        resolve();
      })
      .on('error', (err) => {
        console.error(`❌ Failed to create thumbnail for ${inputPath}: ${err.message}`);
        reject(err);
      })
      .screenshots({
        timestamps: ['00:00:05'],
        filename: outputFilename,
        folder: outputFolder,
        size: '1280x720'
      });
  });
}

// Process all videos
Promise.all(videos.map(createThumbnail))
  .then(() => {
    console.log('🎉 All thumbnails created successfully.');
  })
  .catch((err) => {
    console.error('⚠️ Some thumbnails failed to generate.');
  });
