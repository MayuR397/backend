// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = new mongoose.Schema(
// 	{
// 		name: {
// 			type: String,
// 			required: [true, "Name is required"],
// 		},
// 		email: {
// 			type: String,
// 			required: [true, "Email is required"],
// 			unique: true,
// 			lowercase: true,
// 			trim: true,
// 		},
// 		password: {
// 			type: String,
// 			required: [true, "Password is required"],
// 			minlength: [6, "Password must be at least 6 characters long"],
// 		},
// 		cartItems: [
// 			{
// 				quantity: {
// 					type: Number,
// 					default: 1,
// 				},
// 				product: {
// 					type: mongoose.Schema.Types.ObjectId,
// 					ref: "Product",
// 				},
// 			},
// 		],
// 		role: {
// 			type: String,
// 			enum: ["customer", "admin"],
// 			default: "customer",
// 		},
// 		mit_id:{
// 			type: String,
// 			required: true,
// 			unique: true
// 		}

// 	},
// 	{
// 		timestamps: true,
// 	}
// );

// // Pre-save hook to hash password before saving to database
// userSchema.pre("save", async function (next) {
// 	if (!this.isModified("password")) return next();

// 	try {
// 		const salt = await bcrypt.genSalt(10);
// 		this.password = await bcrypt.hash(this.password, salt);
// 		next();
// 	} catch (error) {
// 		next(error);
// 	}
// });

// userSchema.methods.comparePassword = async function (password) {
// 	return bcrypt.compare(password, this.password);
// };

// const User = mongoose.model("User", userSchema);

// export default User;


import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const addressSchema = new mongoose.Schema({
	name:{
		type: String,
		required: [true, "Name is required"]
	},
	mobile:{
		type: Number,
		required: [true, "Mobile number is prequired"]
	},

	street: {
		type: String,
		required: [true, "Street is required"],
	},
	city: {
		type: String,
		required: [true, "City is required"],
	},
	state: {
		type: String,
		required: [true, "State is required"],
	},
	pincode: {
		type: String,
		required: [true, "Postal code is required"],
	},
	addressType: {
		type: String,
		required: [true, "Address tpye is required"],
	},
});

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [6, "Password must be at least 6 characters long"],
		},
		cartItems: [
			{
				quantity: {
					type: Number,
					default: 1,
				},
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
				},
			},
		],
		role: {
			type: String,
			enum: ["customer", "admin"],
			default: "customer",
		},
		mit_id: {
			type: String,
			unique: true,
		},
		addresses: [addressSchema], // Array of addresses
	},
	{
		timestamps: true,
	}
);

// Pre-save hook to hash password before saving to database
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error) {
		next(error);
	}
});

userSchema.methods.comparePassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
