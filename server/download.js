import ytdl from "ytdl-core";
import fs from "fs";

export const download = (videoId) =>
	new Promise((resolve, reject) => {
		const videoURL = "https://www.youtube.com/shorts/" + videoId;
		console.log("Downloading: ", videoId);

		ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
			.on("info", (info) => {
				const seconds = info.formats[0].approxDurationMs / 1000;

				if (seconds > 90) {
					throw new Error("Video too long");
				}
			})
			.on("end", () => {
				console.log("Download do vídeo finalizado.");
				resolve();
			})
			.on("error", (error) => {
				console.log("Não foi possível fazer o download.");
				reject(error);
			})
			.pipe(fs.createWriteStream("./tmp/audio.mp4"));
	});
