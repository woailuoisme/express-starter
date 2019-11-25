const ErrorResponse = require('../common/error.response');
const asynHandler = require('../middleware/async.handler');
const Bootcamp = require('../models/Bootcamp');
const path = require('path');
/**
 * @desc  get all bootcamp
 * @route /api/v1/bootcamps
 * @access public
 */
const index = asynHandler(async (req, res, next) => {
	// const bootcamps = await Bootcamp.find({});
	res.status(200).json({
		success: true,
		data: res.advancedResults,
	});
});
/**
 * @desc  create single bootcamp
 * @route /api/v1/bootcamps
 * @access public
 */
const create = asynHandler(async (req, res, next) => {
	// console.log(req.body);
	const bootcamp = await Bootcamp.create(req.body);
	console.log(bootcamp);
	res.status(201).json({
		success: true,
		data: bootcamp,
	});
});

/**
 * @desc  get single bootcamp
 * @route /api/v1/bootcamps/:id
 * @access public
 */
const show = asynHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findById(req.params.id);
	if (!bootcamp) {
		return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
	}
	res.status(200).json({
		success: true,
		data: bootcamp,
	});
});

/**
 * @desc  update single bootcamp
 * @route /api/v1/bootcamps/:id
 * @access public
 */
const update = asynHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		context: 'query', //mongoose-unique-validator docs
	});
	if (!bootcamp) {
		return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
	}
	res.status(200).json({ success: true, data: bootcamp });
});

/**
 * @desc  delete single bootcamp
 * @route /api/v1/bootcamps/:id
 * @access public
 */
const destroy = asynHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
	if (!bootcamp) {
		return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
	}
	res.status(200).json({
		success: true,
		data: bootcamp,
		msg: `delete single bootcamp ${req.params.id}`,
	});
});

/**
 * @desc  upload photo for bootcamp
 * @route /api/v1/bootcamps/:id/upload
 * @access public
 */
const photoUpload = asynHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findById(req.params.id);
	if (!bootcamp) return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
	if (!req.files) return next(new ErrorResponse(`Please upload a file`, 400));
	const file = req.files.file;
	// Make sure the image is a photo
	if (!file.mimetype.startsWith('image')) return next(new ErrorResponse(`Please upload an image file`, 400));
	// Check filesize
	const maxFileUpload = process.env.MAX_FILE_UPLOAD;
	if (file.size > maxFileUpload)
		return next(new ErrorResponse(`Please upload an image less than ${maxFileUpload}`, 400));
	file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
	file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
		if (err) {
			console.error(err);
			return next(new ErrorResponse(`Problem with file upload`, 500));
		}
		await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
		res.status(200).json({ success: true, data: file.name });
	});
});

const BootcampController = {
	index,
	show,
	update,
	destroy,
	create,
	photoUpload,
};

module.exports = BootcampController;
