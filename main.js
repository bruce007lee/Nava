
require("./nava");

debugger;

Nava.import("test.Clazz");
Nava.import("test.Clazz2");

var clazz = new test.Clazz("c1_param1","c1_param2");

clazz.method("method_p1","method_p2");

clazz.testFun2();


clazz = new test.Clazz2("c2_param2");


clazz.method();

clazz.testFun2();


