
	Nava.declare("test.Clazz2",{		
		constructor:function(arg){
			Nava.log("test.Class2#constructor args:"+arg);
		},
		
			
		method:function(z){
			this.privteMethod();
			Nava.log(z);
			Nava.log("test.Clazz2#method");
		},
		
		privteMethod:function(){
			Nava.log("test.Clazz2#privteMethod");
		},
		
		testFun2:function(){
			Nava.log("test.Clazz2#testFun2");
		}
		
	});	
	
