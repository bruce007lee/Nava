
Nava.import("test.Clazz2");

Nava.declare("test.Clazz",test.Clazz2,{
	
	constructor:function(arg,arg2){
		Nava.log("test.Class#constructor args:"+arg+","+arg2);
	},
	
	
	method:function(z){
		this.superCall(this,"method",arguments);
		Nava.log("test.Clazz#method");
	},
	
	
	/*
	privteMethod:function(){
		Nava("test.Clazz#privteMethod");
	},
	*/
	
	testFun:function(){
		Nava.log("test.Clazz#testFun");
	}
	
});




