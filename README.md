HOWTO:

1.Copy "nava" folder to your nodejs project.

2.Modify the "nava-config.json" in the "nava" folder,
  set your javascript classpath(The path is relative to "nava" folder,or you could use an absolute path).
  The "nava/../package" is your default classpath folder,if the classpath is not be setted.
  
3.Create a javascript file as your program start entrance.
  (The main.js is an example,you could run it directly.)
  Note:You should load the nava module first like:
  
          require("./nava");


USEAGE:

/*load the nava lib (Only need once in your main js file.)*/
require("./nava");

/**
 *Declare a new javascript class
 */
Nava.declare("[class name]",[super class],{
            method:function(){
                /*Call this method from super class */
                this.superCall(this,"method",arguments);
                ......
            },
            ......
         })

/**
 *Import a defined class
 */
Nava.import("[class name]");

...

[You could find the sample code in the "package" classpath folder.]

  