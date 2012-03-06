if(!global["Nava"]){
	

	/**
	 * Basic class defination
	 * @name Class
	 * @class
	 */
	var Class = function(){
		this._constructor_.apply(this,arguments);
	};

	Class.prototype={
		/*
		 * Class constructor
		 * 
		 */	
		_constructor_:function(){},
			
	    /**
	     * Class name
	     * @type String
	     */
		_className_:null,
		
		/**
		 * Super classes.
		 * @type Array
		 */
		_superClass_:null,
		
		/**
		 * Call super method.
		 * @param {Function} scope The function scope
		 * @param {String} name The function name
		 * @param {Object} args The arguments of the function
		 * @returns
		 */
		superCall:function(scope,name,args){
			var sc = this._superClass_;
			if(!sc)return;
			var l = sc.length;
			for(var i=l-1;i>0;i--){
			var p = this._superClass_[i];
				while(p){
					if(p.prototype[name]){
						return p.prototype[name].apply(scope,args);
					}else{
						p = p._superClass_;
					}
				 }	
			}
	    }
	};
	
	 var fs = require('fs');
	 var path = require('path');
     var util = require('util');
     
	/**
	 * Battleship global static method & config options
	 * @type Nava
	 */
	global["Nava"] = {
			
			/**
			 * Log method
			 * @param {Object} info
			 */
			  log:function(info){
				  if(Nava.config.enableLog){
					console.log(info);
				  }
			  },
			  
			/**
			 * Debug method
			 * @param {Object} info
			 */
			  debug:function(info){
				  if(Nava.config.enableDebug){
					console.log("[DEBUG]",info);
				  }
			  },
			 
			  /**
			   * Battleship global congfiguration.
			   */
			  config:{
				  enableLog:true,
				  enableDebug:false,
				  classPath:null			  
			  },
			  
			  /**
			   * Extends object properties.
			   * @static
			   * @param {Object} obj
			   * @param {Object} obj1
			   */
			  extend:function(obj,obj1){
				  for(var p in obj1){
					 obj[p] = obj1[p];
				  }
			  },
			  
			  /**
			   * Extends prototype properties of class.
			   * @static
			   * @param {Class} clazz
			   * @param {Class} clazz1
			   */
			  extendClass:function(clazz,clazz1){
				  if(typeof(clazz)==="function" &&
						  typeof(clazz1)==="function" )  
				  
				  Nava.extend(clazz.prototype,clazz1.prototype);
		  
				  var p = clazz.prototype;
				  
				  if(p._superClass_==null){
					  p._superClass_ = []; 
				  }
				  p._superClass_.push(clazz1);
			  },
			  
			  _classPath:null,
			  
			  /**
			   * import js class
			   * @static
			   * @param {String} classname The inmport class name.
			   */
			  import:function(classname){				  
				  //check whether the class has been imported. 
				  var segs = classname.split(".");
				  
				  var parent = global;
				  
				  for(var i=0;i<segs.length;i++){ 
					  if(i==segs.length-1){
						  if(!parent[segs[i]]){
							  break;
						  }else{
							 //avoid duplicate import
							 return;
						  }
						  
					  }else if(!parent[segs[i]]){
						break;
					  }
					  
					  parent = parent[segs[i]];
				 
			       }
				  
				  //init class path...
				  var dir,l_indx;
				  if(Nava._classPath==null){	
					  var cpInfo = Nava.config.classPath;
					  if(typeof(cpInfo)==="string" || (util.isArray(cpInfo) && cpInfo.length>0) ){
						  Nava._classPath = cpInfo;
					  }else{
					    dir = __dirname.replace(/\\/g,"/");
					    l_indx = dir.lastIndexOf("/");
					    Nava._classPath = dir.substring(0, l_indx)+"/package";
					  }
				  }
				  
				  var iPath = classname.replace(/\./g,"/");
				  var fp = null;
				  if(util.isArray(Nava._classPath)){
					  var l = Nava._classPath.length;
					  for(var j=0;j<l;j++){
						  if(Nava._isAbsolutePath(Nava._classPath[j])){
						     fp = Nava._classPath[j]+"/"+iPath+".js";
						  }else{
							  dir = __dirname.replace(/\\/g,"/");
							 fp = dir+"/"+Nava._classPath[j]+"/"+iPath+".js";
						  }
						  if(path.existsSync(fp)){
						 	    return require(fp);
							  }						
					  }
					  throw new Error("Failed to import class:"+classname);
				  }else{
					  fp = Nava._classPath+"/"+iPath+".js";
					  
					  if(Nava._isAbsolutePath(Nava._classPath)){
						  fp = Nava._classPath+"/"+iPath+".js";
					  }else{
						 dir = __dirname.replace(/\\/g,"/");
						 fp = dir+"/"+Nava._classPath+"/"+iPath+".js";
					  }
					  try{
				 	   return require(fp);
				      }catch(e){
				    	  e.message = "Failed to import class:"+classname;
				    	  throw e;
				      }
				  }

				 
			  },	
			  
			  _isAbsolutePath:function(path){
				  if(path.charAt(0)==="."){
					  return false;
					  }else{
						  return true;
					  }
			  },
			    
			/**
			 * Declare a new class.
			 * @static
			 * @param {String} clazz The defined class name.
			 * @param {Class} [extendClazz] The extend class name.
			 * @param {Object} prop The appended properties.
			 * @throws {Error}
			 */
			  declare:function(){
				  var args = arguments;
				  
				  if(args.length<2){
					  throw new Error("Need more parameter...");
				  }
				  
				  var obj = args[0];
				  
				  var segs = obj.split(".");
				  var parent = global;
				  
				  for(var i=0;i<segs.length;i++){ 
						  if(i==segs.length-1){
							  if(!parent[segs[i]]){
							    parent[segs[i]] = function(){
							    	this._constructor_.apply(this,arguments);
							    	}; 
							   }else{
								  throw new Error("Duplicate declare class error...");
							  }
							  
						  }else if(!parent[segs[i]]){
							  parent[segs[i]] = {};
							  
						  }
						  
						  parent = parent[segs[i]];
					 
				  }
				  
			         if(parent===global)return;
			         
			         Nava.extendClass(parent,Class);
			         
				  for(var x=1;x<args.length;x++){
					  if(typeof(args[x])==="function"){
						Nava.extendClass(parent,args[x]);
					  }else if(typeof(args[x])==="object"){					    
					    for(var p in args[x]){
					    	if(p==="constructor"){
					    		parent.prototype["_constructor_"] = args[x][p];
					    	}else{
					    		parent.prototype[p] = args[x][p];
					    	}
						  }
					  }
				  }	
				  
				  parent.prototype._className_=obj;
				  
			  }
			};
	
	
	//init Nava config

	  try {
	    var jsonPath = path.resolve(__dirname, 'nava-config.json');
	    var json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
	    Nava.extend(Nava.config,json);//overwrite config
	  } catch (e) {
		  e.message = "Failed to load nava-config.....";
		  throw e;
	  }
	
	Nava.debug("Nava initialized...");	
	
}


