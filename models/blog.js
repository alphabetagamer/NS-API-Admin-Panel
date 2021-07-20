const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var products = new Schema({
	product_id : {
		type : Number,
		unique : true,
    required:true
	},
	name:{
		type:String,
    required:true
	},
	vendor_id:{
		type:Number,
    required:true
	},
	price:{
		type:Number,
    required:true
	},
	discount:{
		type:Number,
		min:0,
		max:100,
    required:true
	},
	images:[{
		image:{
		type:String
	},
	image_alt_text:{
		type:String
	},
	image_caption:{
		type:String
	}
}],
	thumbnails:[{
		thumbnail:{
			type:String,
		}
	}

	],
	short_desc:{
		type:String,
    required:true
	},
	long_desc:{
		type:String
	},
	categories:[{
		category:{
			type:String
		}
	}],
	flavor:{
		type:String,
		required:true
	},
	other_flavors:[{
		product_id:{
			type:Number
		},
		flavor:String
	}],
	weight:{
		type:Number
	},
	other_weights:[{
		product_id:{
			type:Number
		},
		weight:Number
	}],
	goals:[{
		goal:String
	}],
	brand_id:{
		type:Number
	}



});
var vendor_table = new Schema({
	vendor_id:{
		type:Number,
		unique:true,
    required:true
	},
	address:{
		address:{
			type:String
		},
		city:{
			type:String
		},
		state:{
			type:String
		},
		pin:{
			type:String
		},
		country:{
			type:String
		}
	},
	username:{
		type:String,
	required:true,
	unique:true
	},
	name:{
		first_name:{
		type:String,
	required:true},
	last_name:{
		type:String,
		required:true
	}
	},
	email:{
		type:String,
	required:true,
	unique:true
	},
	mobile:{
		type:Number,
	required:true,
	required:true
	},
	products:[{
		product_id:{
		type:Number,
	required:true
		}
	}],
	password:{
		type:String,
		required:true
	},
	payment_details:{
		bank:{
			ifcs_code:{
				type:String,
				required:true
			},
			account_no:{
				type:String,
				required:true
			}

		},
		paytm:{
			mobile_no:{
				type:String
			}
		}
		
	},
	join_date:{
		type:Date,
		required:true
	},
	service_pin:[{
		pin:{
			type:Number
		}
	}],
	brands:[{
		brand_id:{
			type:Number
		}
	}],
	rating:{
		type:Number
	}

});
var admin_table = new Schema({
	user_id: {
    type: Number,
    unique: true,
    required:true
  },
	name:{
		first_name:{
		type:String,
	required:true},
	last_name:{
		type:String,
		required:true
	}
	},
	username:{
		type:String,
		unique:true,
    required:true
	},
	phone:{
		type:Number,
		unique:true,
		maxlength:10,
		minlength:10,
    required:true

	},
	email:{
		type:String,
		unique:true,
    required:true
	},
	password:{
		type:String,
		required:true
	},
	join_date:{
		type:Date
	},
	role:{
		type:String
	}

});
var user_table = new Schema({
	user_id:{
		type:Number,
		unique:true,
		required:true
	},
	username: {
    type: String,
	required: true,
	unique:true
	  },
	  name:{
		  first_name:{
			  type:String
		  },
		  last_name:{
			  type:String
		  }
	  },
	  password:{
		  type:String,
		  required:true
	  },
	  wallet:{
		  wallet_id:{
			  type:Number,
			  unique:true
		  },
		  wallet_balance:{
			  type:Number
		  }
	  },
	  mobile:{
		  type:Number,
		  minlength:10,
		  maxlength:10
	  },
	  address:{
		  address:{
			  type:String
		  },
		  city:{
			  type:String
		  },
		  state:{
			  type:String
		  },
		  pin:{
			  type:String
		  },
		  country:{
			  type:String
		  }
	  },
	  wishlist:[{
		  product_id:{
			  type:Number
		  }
	  }],
	  join_date:{
		  type:Date
	  },
	  referral_code:{
		  type:String,
		  unique:true
	  },
	  order_id:[{
		  order_id:{
			  type:Number
		  }
	  }],
	  cart_items:[{
		  product_id:{
			  type:String
		  }
	  }],
	  email:{
		  type:String,
		  unique:true
	  }
});
var cashback_table = new Schema({
	user_id:{
		type:Number,
		required:true
	},
	order_id:{
		type:Number,
		required:true
	},
	wallet_id:{
		type:String

	},
	date:{
		type:Date
	},
	amount:{
		type:Number
	}
});
var reviews_table= new Schema({
review_id:{
	type:Number,
	required:true,
	unique:true
},
product_id:{
	type:Number,
	required:true
},
rating:{
	type:Number,
	required:true
},
review_text:{
	type:String,
	required:true
},
review_title:{
	type:String
},
author_id:{
	type:Number
},
images:[{
	image:String,
	image_alt_text:String
}]
});
var order_table = new Schema({
	order_id:{
		type:Number,
		required:true,
		unique:true
	},
	user_id:{
		type:Number,
		required:true
	},
	items:[{
		vendor_id:{
			type:Number
		},
		product_id:{
			type:Number
		}
	}],
	total:[{
		net_total:Number,
		tax:Number,
		discount:{
			type:Number,
			default:0
		},
		cashback:{
			type:Number,
			default:0
		}
	}],
	order_date:{
		type:Date
	},
	payment_method:{
		type:String,
		enum:["paytm","net_banking","Credit_card","Debit_card"]
	},
	state:{
		type:String,
		enum:["ongoing","completed","refund"]
	},
	address:{
		address:String,
		city:String,
		state:String,
		pincode:String
	}
});
var blog_table = new Schema({
	blog_id:{
		type:Number,
		required:true,
		unique:true
	},
	title:{
		type:String,
		required:true,
		unique:true
	},
	body:{
		type:String,
		required:true
	},
	images:[{
		image:{
			type:String
		}
	}],
	views:Number,
	user_id:{
		type:String
	},
	categories:[{
		category:{
			type:String
		},
		_id:false
	}],
	publish_date:{
		type:Date
	},
	likes:[{
		user_id:{
			type:String
		}
	}],
	username:{
		type:String
	}
});

var comments_table = new Schema({
	comment_id:{
		type:Number,
		required:true,
		unique:true
	},
	blog_id:{
		type:Number,
		required:true
	},
	text:{
		type:String
	},
	user_id:{
		type:Number
	},
	parent_comment_id:{
		type:Number,
		default:-1
	},
	likes:[{
		user_id:{
			type:Number
		}
	}],
	date:{
		type:Date
	}
});
var pincode_table = new Schema({
	pincode:{
		type:Number,
		unique:true
	},
	vendors:[{
		vendor_id:{
			type:Number
		}
	}]

});
var testimonial_table=new Schema({
	testimonial_id:{
		type:Number,
		required:true,
		unique:true
	},
	user_id:{
		type:Number,
		required:true
	},
	rating:{
		type:Number,
		required:true
	},
	review_text:{
		type:String,
		required:true
	},
	image:[{
		image:{
			type:String
		}
	}]
});
var brand_table=new Schema({
	brand_id:{
		type:Number,
		required:true,
		unique:true
	},
	items:[{
		product_id:{
			type:Number
		},
		vendor_id:{
			type:Number
		}
	}],
	name:{
		type:String
	},
	brand_page:{
		type:String
	}
});

// var transaction_table= new Schema({
// 	transaction_id:{
// 		type:Number,
// 		required:true,
// 		unique:true
// 	},
// 	from:{
// 		type:String,
// 		enum:["vendor_id","user_id"]
// 	}
// });
var coupon_table = new Schema({
	coupon_code:{
		type:String,
		unique:true
	},
	title:{
		type:String
	},
	desc:{
		type:String
	},
	terms:{
		type:String
	},
	images:[{
		image:String,
		image_alt_text:String
	}],
	creation_date:Date,
	state:{
		type:String,
		enum:["active","in-active"],

	},
	active_date:{
		type:Date
	},
	end_date:{
		type:Date
	},
	quantity:{
		type:Number,
		default:999999
	},
	coupon_type:{
		single:{
			product_id:{
				type:Number,
				default:-1
			}
		},
		category:{
			category:{
				type:String,
				default:-1
			}
		},
		brand:{
			brand_id:{
				type:Number,
				default:-1
			}
		},
		new_user:{
			type:Boolean,
			default:false
		},
		repeat_user:{
			type:Boolean,
			default:false

		},
		all_user:{
			type:Boolean,
			default:false
		}

	}
});
var referral_table = new Schema({
	user_id:Number,
	referred:[{
		user_id:{type:Number}
	}]
});
// module.exports = products = mongoose.model('products', products);
// module.exports = vendor_table = mongoose.model('vendor_table', vendor_table);
// module.exports = admin_table = mongoose.model('admin_table', admin_table);
// module.exports = user_table = mongoose.model('user_table', user_table);
// module.exports = cashback_table = mongoose.model('cashback_table', cashback_table);
// module.exports = reviews_table = mongoose.model('reviews_table', reviews_table);
// module.exports = order_table = mongoose.model('order_table', order_table);
// module.exports = comments_table = mongoose.model('comments_table', comments_table);
// module.exports = referral_table = mongoose.model('referral_table', referral_table);
// module.exports = coupon_table = mongoose.model('coupon_table', coupon_table);
// module.exports = brand_table = mongoose.model('brand_table', brand_table);
// module.exports = testimonial_table= mongoose.model('testimonial_table', testimonial_table);
// module.exports = pincode_table = mongoose.model('pincode_table', pincode_table);
module.exports = blog_table = mongoose.model('blog_table', blog_table);
