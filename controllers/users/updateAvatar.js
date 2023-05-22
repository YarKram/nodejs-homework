const path = require("path");
const fs = require("fs/promises");
const service = require("../../service/schemas/user");
const jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
	try {
		const { _id } = req.user;
		if (!req.file) {
			res.status(400).json({ message: "No file uploaded" });
			return;
		}
		const { path: tempUpload, originalname } = req.file;
		const filename = `${_id}_${originalname}`;
		const resultUpload = path.join(avatarsDir, filename);

		await jimp.read(tempUpload).then((avatar) => {
			return avatar.resize(250, 250).write(tempUpload);
		});

		await fs.rename(tempUpload, resultUpload);

		const avatarURL = path.join("avatars", filename);
		await service.updateUserAvatar(_id, { avatarURL });

		res.status(200).json({
			avatarURL,
		});
	} catch (error) {
		res.status(401).json({ message: "Not authorized" });
	}
};

module.exports = updateAvatar;
