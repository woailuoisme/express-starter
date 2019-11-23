const {Schema} = require('mongoose');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const slugify = require('slugify');
const validator = require('validator');
const moment = require('moment');

const BootcampSchema = new Schema(
    {
        // user: {
        // 	type: Schema.types.ObjectId
        // },
        name: {
            type: String,
            trim: true,
            required: true,
            index: true,
            unique: true,
            maxlength: 50,
        },
        photo: {
            type: String,
            default: 'no-photo.jpg',
        },
        slug: String,
        description: {
            type: String,
            trim: true,
            required: [true, 'Please add a description'],
            maxlength: [200, 'description can not be more than 200 characters'],
        },
        website: {
            type: String,
            validate: {
                validator: v => validator.isURL(v),
                message: props => `${props.value} is not a valid url!`,
            },
        },
        phone: {
            type: String,
            maxlength: [20, 'Phone number can not be longer than 20 characters'],
        },
        email: {
            type: String,
            validate: {
                validator: v => validator.isEmail(v),
                message: props => `${props.value} is not a valid email!`,
            },
        },
        address: {
            type: String,
            required: [true, 'Please add an address'],
        },
        careers: {
            // Array of strings
            type: [String],
            required: true,
            enum: ['Web Development', 'Mobile Development', 'UI/UX', 'Data Science', 'Business', 'Other'],
        },
        housing: {
            type: Boolean,
            default: false,
        },
        jobAssistance: {
            type: Boolean,
            default: false,
        },
        jobGuarantee: {
            type: Boolean,
            default: false,
        },
        acceptGi: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                // delete ret.__v;
                ret.updatedAt = moment(ret.updatedAt).format('YYYY-MM-DD HH:mm:ss.SSS');
                ret.createdAt = moment(ret.createdAt).format('YYYY-MM-DD HH:mm:ss.SSS');
            },
        },
        toObject: {virtuals: true},
    },
);

BootcampSchema.plugin(uniqueValidator, {message: "'{PATH}' value '{VALUE}' to be unique."});

BootcampSchema.pre('save', function (next) {
    // if (!this.isModified('name')) next()
    this.slug = slugify(this.name, {lower: true});
    // next();
});

// Cascade delete courses when a bootcamp is deleted
BootcampSchema.pre('remove', async function (next) {
    console.log(`Courses being removed from bootcamp ${this._id}`);
    await this.model('Course').deleteMany({bootcamp: this._id});
    next();
});

// Reverse populate with virtuals
BootcampSchema.virtual('courses', {
    ref: 'Course',
    localField: '_id',
    foreignField: 'bootcamp',
    justOne: false,
});

const updateDate = async function (next) {
    // console.log(typeof this)
    // console.log(this)
    // console.log(this.model)
    // console.log(this.get('name'));
    // const updateTosave = await this.model.findOne(this.getQuery())
    // const name = updateTosave.name
    // console.log(updateTosave._doc)
    this.update;
    this.set({slug: slugify(this.get('name'), {lower: true})});
    // console.log(this.slug);
    next();
};

// BootcampSchema.pre('update', function() {
//     this.update({},{ $set: { updatedAt: new Date() } });
// });

// update date for bellow 4 methods
BootcampSchema.pre('updateOne', updateDate)
    .pre('update', updateDate)
    .pre('updateMany', updateDate)
    .pre('findOneAndUpdate', updateDate)
    .pre('findByIdAndUpdate', updateDate);

module.exports = Bootcamp = mongoose.models.Bootcamp || mongoose.model('Bootcamp', BootcampSchema);
