# Inheritance (REF [here](https://launchschool.com/books/oo_ruby/read/inheritance#classinheritance))
  * **Inheritance** ***is when a class inherits behavior from another class***.
  * The **class that is inheriting behavior is called the subclass** and the ***class it inherits from is called the superclass***.
  * We use **inheritance** **as a way to extract common behaviors from classes that share that behavior**, and ***move it to a superclass***.
  **** This lets us keep logic in one place.*** Let's take a look at an example.
## Class Inheritance
  * Here, we're extracting the ```speak``` **method to a superclass ```Animal```**, and **we use inheritance to make that behavior available to ```GoodDog``` and ```Cat``` classes**.
  ```rb
    class Animal
      def speak
        "Hello!"
      end
    end

    class GoodDog < Animal
    end

    class Cat < Animal
    end

    sparky = GoodDog.new
    paws = Cat.new
    puts sparky.speak           # => Hello!
    puts paws.speak             # => Hello!
  ```
  * We use the ```<``` **symbol to signify that the ```GoodDog``` class is inheriting from the ```Animal``` class**.
  * **This means that all of the methods in the ```Animal``` class are available to the ```GoodDog```** class for use.
  * We also created a new class called ```Cat``` that inherits from ```Animal``` as well.
  * We've eliminated the speak method from the ```GoodDog``` class in order to use the speak method from ```Animal```.
  * When we run this code we see the correct output. **Both classes are now using the superclass Animal's speak method.**
  * But **what if we want to use the original speak method from the ```GoodDog``` class only**. Let's add it back and see what happens.
  ```rb
    class Animal
      def speak
        "Hello!"
      end
    end

    class GoodDog < Animal
      attr_accessor :name

      def initialize(n)
        self.name = n
      end

      def speak
        "#{self.name} says arf!"
      end
    end

    class Cat < Animal
    end

    sparky = GoodDog.new("Sparky")
    paws = Cat.new

    puts sparky.speak           # => Sparky says arf!
    puts paws.speak             # => Hello!
  ```
  * In the ```GoodDog``` class, **we're overriding the speak method in the ```Animal``` class** because ***Ruby checks the object's class first for the method before it looks in the superclass***.
  * That means when we wrote the code ```sparky.speak```, **it first looked at sparky's class, which is ```GoodDog```.** It found the **speak method there and used it. When we wrote** the code ```paws.speak```, **Ruby first looked at paws's class, which is ```Cat```**. It did not find a speak method there, so it continued to look in ```Cat```'s superclass, ```Animal```. It found a ***speak method in ```Animal```, and used it. We'll talk about this method lookup path more in depth in a bit***.
  * **Inheritance** ***can be a great way to remove duplication in your code base***.
  * There is an acronym that you'll see often in the Ruby community, "DRY". This stands for "Don't Repeat Yourself". It means that if you find yourself writing the same logic over and over again in your programs, there are ways to extract that logic to one place for reuse.

## Super
  * Ruby provides us with the ```super``` **keyword to call methods earlier in the method lookup path**.
  * When you call ```super``` **from within a method**, ***it searches the method lookup path for a method with the same name then invokes it***.
  * Let's see a quick example of how this works:
  ```rb
    class Animal
      def speak
        "Hello!"
      end
    end

    class GoodDog < Animal
      def speak
        super + " from GoodDog class"
      end
    end

    sparky = GoodDog.new
    sparky.speak        # => "Hello! from GoodDog class"
  ```
  * In the above example, we've created a simple ```Animal``` class **with a speak instance method**.
  * We then created GoodDog which subclasses ```Animal``` also **with a speak instance method to override the inherited version**.
  * However, **in the subclass' speak method we use super to invoke the speak method from the superclass**, ```Animal```, and then **we extend the functionality by appending some text to the *return value***.
  * Another **more common way of using ```super``` is with ```initialize```**. Let's see an illustration of that:
  ```rb
    class Animal
      attr_accessor :name

      def initialize(name)
        @name = name
      end
    end

    class GoodDog < Animal
      def initialize(color)
        super
        @color = color
      end
    end

    bruno = GoodDog.new("brown")        # => #<GoodDog:0x007fb40b1e6718 @color="brown", @name="brown">
  ```
  * The interesting concept we want to explain is the use of ```super``` in the ```GoodDog``` class.
  * **In this example, we're using ```super``` with *no arguments***. However, the ```initialize``` method, where ```super``` is being used, takes an argument and adds a new twist to how ```super``` is invoked.
  * Here, **in addition to the default behavior, ```super``` automatically forwards the arguments that were passed to the method from which ```super``` is called** (```initialize``` method in ```GoodDog``` class).
  * **At this point, ```super``` will pass the color argument in the ```initialize``` defined in the subclass to that of the Animal superclass and invoke it**.
  * **That explains the presence of ```@name="brown"```** when the bruno instance is created.
  * Finally, the subclass' ```initialize``` continues to set the ```@color``` instance variable.
  * ***When called with specific arguments, eg. ```super(a, b)```, the specified arguments will be sent up the method lookup chain***.
  * Let's see a quick example:
  ```rb
    class BadDog < Animal
      def initialize(age, name)
        super(name)
        @age = age
      end
    end

    BadDog.new(2, "bear")        # => #<BadDog:0x007fb40b2beb68 @age=2, @name="bear">
  ```
  * This is similar to our previous example, **with the difference being that ```super``` takes an argument**, hence **the passed in argument is sent to the *superclass***.
  * Consequently, in this example when a BadDog class is created, the passed in name argument ("bear") is passed to the superclass and set to the @name instance variable.
  * There's one last twist. **If you call ```super()``` exactly as shown -- with parentheses -- it calls the method in the superclass *with no arguments at all*.** If you have a method in your superclass that takes no arguments, this is the safest -- and sometimes the only -- way to call it:
  ```rb
    class Animal
      def initialize
      end
    end

    class Bear < Animal
      def initialize(color)
        super()
        @color = color
      end
    end

    bear = Bear.new("black")        # => #<Bear:0x007fb40b1e6718 @color="black">
  ```
  * If you **forget to use the parentheses here**, ***Ruby will raise an ```ArgumentError``` exception*** since the number of arguments is incorrect.
## Mixing in Modules
  * **Another way to DRY up your code in Ruby is to use modules**. We've already seen a little bit of how to use modules, but we'll give a few more examples here.
  * **Extracting common methods to a superclass**, like we did in the previous section, **is a great way to model concepts that are naturally hierarchical**.
  * We gave the example of animals. We have a generic superclass called ```Animal``` that can keep all basic behavior of all animals.
  * **We can then expand on the model a little and have, perhaps, a ```Mammal``` subclass of ```Animal```**. We can imagine the entire class hierarchy to look something like the figure below.

  ![](2021-12-28-14-36-46.png)

  * **The above diagram shows what *pure class based inheritance* looks like**.
  * Remember **the goal of this is to put the right behavior (i.e., methods) in the right class so we don't need to repeat code in multiple classes**.
  * We can **imagine that all Fish objects are related to animals that live in the water, so perhaps *a swim method should be in the Fish class***.
  * We can also imagine that **all Mammal objects will have warm blood**, so **we can create a method called ```warm_blooded?```** **in the Mammal class** and have it return true.
  * Therefore, **the Cat and Dog objects will have access to the warm_blooded?** method which is automatically inherited from Mammal by the Cat and Dog classes, but they won't have access to the methods in the Fish class.
  * **This type of hierarchical modeling works, to *some extent***, but ***there are always exceptions***.
  * For example, **we put the swim method in the Fish class**, ***but some mammals can swim as well***.
  * **We don't want to move the swim method into Animal because *not all animals swim***, and we don't want to create another swim method in Dog because that violates the DRY principle.
  * For concerns such as these, we'd like to **group them into a module and then mix in that module to the classes that require those behaviors.** Here's an example:
  ```rb
    module Swimmable
      def swim
        "I'm swimming!"
      end
    end

    class Animal; end

    class Fish < Animal
      include Swimmable         # mixing in Swimmable module
    end

    class Mammal < Animal
    end

    class Cat < Mammal
    end

    class Dog < Mammal
      include Swimmable         # mixing in Swimmable module
    end
  ```
  * And now Fish and Dog objects can swim, but objects of other classes won't be able to:
  ```rb
    sparky = Dog.new
    neemo  = Fish.new
    paws   = Cat.new

    sparky.swim                 # => I'm swimming!
    neemo.swim                  # => I'm swimming!
    paws.swim                   # => NoMethodError: undefined method `swim' for #<Cat:0x007fc453152308>
  ```
  * Using modules to group common behaviors allows us to build a more powerful, flexible and DRY design.
  ______________________________________________________________________________________________________________________________________________________________________
  * <u>***NOTE***</u>
    * **A common naming convention for Ruby is to use the "able" suffix on whatever verb describes the behavior that the module is modeling**.
    * You can **see this convention with our ```Swimmable``` module**. Likewise, **we could name a module that describes "walking" as Walkable.**
    * Not all modules are named in this manner, however, it is quite common.
  ______________________________________________________________________________________________________________________________________________________________________
## Inheritance Vs Modules
  * Now you know **the two primary ways that Ruby implements inheritance.** 
    * ***Class inheritance*** is the traditional way to think about inheritance: **one type inherits the behaviors of another type**. The result is a new type that specializes the type of the superclass.
    * The other form is sometimes called ***interface inheritance***: this is **where mixin modules come into play**. **The class doesn't inherit from another type, but instead inherits the interface provided by the *mixin module***. In this case, the result type is not a specialized type with respect to the module.
  * **You may wonder when to use *class inheritance* vs *mixins*.** Here are a couple of things to consider when evaluating these choices.
    * **You can only subclass (class inheritance) *from one class***. 
      * ***You can mix in as many modules (interface inheritance) as you'd like.***
    * If **there's an "is-a" relationship**, ***class inheritance*** **is usually the correct choice**.
    * If **there's a "has-a" relationship**, ***interface inheritance*** **is generally a better choice**.
    * For example, ***a dog "is an" animal and it "has an" ability to swim.***
    * ***You cannot instantiate modules*** (i.e., no object can be created from a module). Modules are used only for namespacing and grouping common methods together.
## Method Lookup Path
  * Now that you have a grasp on both inheritance and mixins. **Let's put them both together to see how that affects the method lookup path**.
  * Recall the **method lookup path is the order in which classes are inspected when you call a method**. Let's take a look at the example code below.
  ```rb
    module Walkable
      def walk
        "I'm walking."
      end
    end

    module Swimmable
      def swim
        "I'm swimming."
      end
    end

    module Climbable
      def climb
        "I'm climbing."
      end
    end

    class Animal
      include Walkable

      def speak
        "I'm an animal, and I speak!"
      end
    end
  ```
  * We **have three modules and one class**. **We've mixed in one module into the ```Animal``` class**.
  * The method lookup path is the path Ruby takes to look for a method. **We can see this path with the ancestors class method.**
  ```rb
    puts "---Animal method lookup---"
    puts Animal.ancestors
  ```
  * Output
  ```sh
    ---Animal method lookup---
    Animal
    Walkable
    Object
    Kernel
    BasicObject
  ```
  * This means that **when we call a method of any ```Animal``` object**, ***first Ruby looks in the ```Animal``` class***, ***then the ```Walkable``` module***, ***then the Object class***, ***then the Kernel module***, and **finally the ```BasicObject``` class**.
  ```rb
    fido = Animal.new
    fido.speak                  # => I'm an animal, and I speak!
  ```
  * ***Ruby found the speak method in the Animal class and looked no further.***
  ```rb
    fido.walk                   # => I'm walking.
  ```
  * Ruby **first** ***looked for the ```walk``` instance method in ```Animal```***, and **not finding it there**, kept **looking in the next place according to our list**, ***which is the ```Walkable``` module***. It saw a ```walk``` method there, **executed it, and stopped looking** further.
  ```rb
    fido.swim
      # => NoMethodError: undefined method `swim' for #<Animal:0x007f92832625b0>
  ```
  * **Ruby traversed all the classes and modules in the list, and didn't find a swim method,** ***so it threw an error***.
  * Let's **add another class** to the code above.
  * This **class will inherit from the Animal class and mix in the Swimmable and Climbable modules**.
  ```rb
    class GoodDog < Animal
      include Swimmable
      include Climbable
    end

    puts "---GoodDog method lookup---"
    puts GoodDog.ancestors
  ```
  * And this is the output we get:
  ```sh
    ---GoodDog method lookup---
    GoodDog
    Climbable
    Swimmable
    Animal
    Walkable
    Object
    Kernel
    BasicObject
  ```
  * There are **several interesting things about the above output**.
    * First, this **tells us that the order in which we include modules** is important. 
    * Ruby actually **looks at the *last* module we included *first***.
    * This means that in **the rare occurrence that the modules we mix in contain a method with the same name**, ***the last module included will be consulted first***.
    * The second interesting thing **is that the module included in the superclass made it on to the method lookup path**.
    * That means that all ```GoodDog``` objects **will have access to not only Animal methods, but also methods defined in the Walkable module**, as well as all other modules mixed in to any of its superclasses.
  * Sometimes when you're working on a large project, **it can be confusing where all these methods are coming from**. By understanding the method lookup path, we can have a better idea of where and how all available methods are organized.
## More Modules
  * Now we'll see **two more uses** for modules.
  * The **first use** case we'll discuss **is using modules for *namespacing***. 
    * In this context, **namespacing means organizing similar classes under a module**.
    * In other words, **we'll use modules to group *related classes***. Therein lies the first **advantage of using modules for namespacing**.
    * It **becomes easy for us to recognize related classes in our code.**
  * **The second advantage** is it **reduces the likelihood of our classes *colliding with other similarly named* classes** in our codebase.
  * Here's how we do it:
  ```rb
    module Mammal
      class Dog
        def speak(sound)
          p "#{sound}"
        end
      end

      class Cat
        def say_name(name)
          p "#{name}"
        end
      end
    end
  ```
  * We **call classes in a module by appending the *class name* to the *module name*** with two colons(```::```)
  ```rb
    buddy = Mammal::Dog.new
    kitty = Mammal::Cat.new
    buddy.speak('Arf!')           # => "Arf!"
    kitty.say_name('kitty')       # => "kitty"
  ```
  * The **second use case for modules** we'll look at **is using modules *as a container for methods*, called *module methods***.
  * This involves **using modules to house other methods**.
  * This is very ***useful for methods that seem out of place within your code***.
  * Let's use our ```Mammal``` module to demonstrate:
  ```rb
    module Mammal
      ...

      def self.some_out_of_place_method(num)
        num ** 2
      end
    end
  ```
  * **Defining methods this way within a module means we can call them directly from the module**:
  ```rb
    value = Mammal.some_out_of_place_method(4)
  ```
  * We can also call such methods by doing:
  ```rb
    value = Mammal::some_out_of_place_method(4)
  ```
  * <u>***although the former is the preferred way.***</u>
## Private, Protected, and Public
  * The last thing we want to cover **is something that's actually quite simple, but necessary; Method Access Control**.
  * **Access Control** is a concept that exists in a number of programming languages, including Ruby.
  * It is generally **implemented through the use of *access modifiers***.
  * The purpose of access modifiers **is to allow or restrict access to a particular thing**.
  * In Ruby, the **things that we are concerned with restricting access to *are the methods defined in a class***.
  * In a Ruby context, therefore, you'll commonly see this concept **referred to as *Method Access Control***.
  * The way that **Method Access Control** is implemented in Ruby ***is through the use of the public, private, and protected access modifiers***.
  * Right now, **all the methods in our ```GoodDog``` class are public methods**.
  * A **public method** ***is a method that is available to anyone who knows either the class name or the object's name***.
    * These methods are **readily available for the rest of the program to use and comprise the class's interface** (that's how other classes and objects will interact with this class and its objects).
  * **Sometimes you'll have methods that are doing work in the class but don't need to be available to the rest of the program.**
    * ***These methods can be defined as private.***
    * **How do we define private methods**?
      * **We use the ```private``` method call** in our program and ***anything below it is private*** (**unless another method, like ```protected```, is called after it** to negate it).
  * In our ```GoodDog``` class **we have one operation that takes place that we could move into a private method**.
  * When we initialize an object, **we calculate the dog's age in Dog years**.
    * Let's refactor this logic ***into a method and make it private so nothing outside of the class can use it***.
    ```rb
      class GoodDog
        DOG_YEARS = 7

        attr_accessor :name, :age

        def initialize(n, a)
          self.name = n
          self.age = a
        end

        private

        def human_years
          age * DOG_YEARS
        end
      end

      sparky = GoodDog.new("Sparky", 4)
      sparky.human_years
    ```
    * We get the error message:
    ```sh
      NoMethodError: private method `human_years' called for
        #<GoodDog:0x007f8f431441f8 @name="Sparky", @age=4>
    ```
    * We have made the ```human_years``` **method private by placing it under the ``private`` method**.
    * **What is it good for, then, if we can't call it?**
    * ``private`` methods **are only accessible from other methods in the class**.
    * For example, given the above code, the following would be allowed:
    ```rb
      # assume the method definition below is above the "private" method

      def public_disclosure
        "#{self.name} in human years is #{human_years}"
      end
    ```
    * Note that in this case, **we can not use ```self.human_years```, because the ```human_years``` method is private**.
      * Remember that ```self.human_years``` ***is equivalent to ```sparky.human_years```,*** **which is not allowed for private methods.**
      * Therefore, **we have to just use ```human_years```.**
    * In summary, ```private``` ***methods are not accessible outside of the class definition at all***, and **are only accessible from inside the class *when called without self***.
  ______________________________________________________________________________________________________________________________________________________________________
  * ***<u>NOTE</u>***
    * As of ```Ruby 2.7```, **it is now legal to call private methods with a literal ```self``` as the caller.**
    * Note that this does not mean that we can call a private method with any other object, not even one of the same type. We can only call a private method with the current object.
  ______________________________________________________________________________________________________________________________________________________________________
  * **Public and private methods are most common**, but ***in some less common situations, we'll want an in-between approach***.
  * We can **use the ```protected``` method to create protected methods**.
    * The easiest way to understand ```protected``` methods **is to follow these two rules**:
      * from ***inside* the class**, protected methods **are accessible just like public methods**.
      * from ***outside* the class**, protected methods ***act* just like private methods**.
  * Let's take a look at some examples:
  ```rb
    class Animal
      def a_public_method
        "Will this work? " + self.a_protected_method
      end

      protected

      def a_protected_method
        "Yes, I'm protected!"
      end
    end
  ```
  * Study the above code, as it's a little complicated. We'll create an Animal object and test it out.
  ```rb
    fido = Animal.new
    fido.a_public_method        # => Will this work? Yes, I'm protected!
  ```
  * The above line of code **shows us that we can call a protected method ***from within the class*****, **even with ```self``` prepended.**
  * **What about outside** of the class?
  ```rb
    fido.a_protected_method
      # => NoMethodError: protected method `a_protected_method' called for
        #<Animal:0x007fb174157110>
  ```
  * This demonstrates the second rule, that we can't call protected methods from outside of the class. The two rules for protected methods apply within the context of inheritance as well.
  * There are **some exceptions** to this rule, but we won't worry about that yet.
  * **Protected methods** are ***not used often in practice*** and that knowledge isn???t transferrable to other languages, so if you remember those two rules about protected methods, that should be good enough for the time being.
  ______________________________________________________________________________________________________________________________________________________________________
  * The **similarity** between ***Protected*** and ***Private*** :
    * Both can be accessed from outside the class through a public method.
  * The differences between Protected and Private are :
    * **Private method** can **not be called with a receiver** (***not even with ```#self```***). UNLESS ... **calling a PRIVATE SETTER method**. If you try to remove the receiver, Ruby will create a local variable. ***Self is a must in this case***.
    * ***```Protected``` may or may not use ```self```.***
    * **Protected** can **access another object's protected method** that comes from the same class, ***Private can't.***
  ______________________________________________________________________________________________________________________________________________________________________
## Accidental Method Overriding
  * It???s important to remember ***that every class you create inherently subclasses from class Object***. 
    * The Object class is **built into Ruby and comes with many critical methods**.
  ```rb
    class Parent
      def say_hi
        p "Hi from Parent."
      end
    end

    Parent.superclass       # => Object
  ```
  * This means that **methods defined in the ```Object``` class are available in all classes**.
  * Further, recall that through the magic of inheritance, **a subclass can override a superclass???s method**.
  ```rb
    class Child < Parent
      def say_hi
        p "Hi from Child."
      end
    end

    child = Child.new
    child.say_hi         # => "Hi from Child."
  ```
  * This means that, **if you accidentally override a method** that was originally **defined in the Object class**, it ***can have far-reaching effects on your code***.
    * ***For example***, ```send``` **is an instance method that all classes inherit from Object**.
    * If you **defined a new** ```send``` instance method **in your class**, **all objects of your class will call your custom ```send``` method**, instead of the one in class Object, which is probably the one they mean to call.
    * Object ```send``` **serves as a way to call a method by passing it a symbol or a string which represents the method you want to call**.
    * **The next couple of arguments will represent the method's arguments**, if any.
  * Let's see how ```send``` normally works **by making use of our Child class:**
  ```rb
    son = Child.new
    son.send :say_hi       # => "Hi from Child."
  ```
  * Let's see what happens **when we define a ```send``` method in our Child class and then try to invoke Object's ```send``` method**:
  ```rb
    class Child
      def say_hi
        p "Hi from Child."
      end

      def send
        p "send from Child..."
      end
    end

    lad = Child.new
    lad.send :say_hi
  ```
  * Normally **we would expect the output of this call to be** ***"Hi from Child."*** but upon running the code we get a completely different result:
  ```sh
    ArgumentError: wrong number of arguments (1 for 0)
    from (pry):12:in `send'
  ```
  * In our example, **we're passing send one argument even though our overridden send method does not take any arguments.**
  * Let's take a look at another example by **exploring Object's instance_of? method**.
  * What this handy method does is **to return true if an object is an instance of a given class and false otherwise**. Let's see it in action:
  ```rb
    c = Child.new
    c.instance_of? Child      # => true
    c.instance_of? Parent     # => false
  ```
  * Now let's **override ```instance_of?```** within Child:
  ```rb
    class Child
      # other methods omitted

      def instance_of?
        p "I am a fake instance"
      end
    end

    heir = Child.new
    heir.instance_of? Child
  ```
  * Again, we'll see something completely different though our intention was to use Object's instance_of? method:
  ```sh
    ArgumentError: wrong number of arguments (1 for 0)
    from (pry):22:in `instance_of?'
  ```
  * That said, one ```Object``` **instance method that's easily overridden without any major side-effect is the ```to_s``` method.**
  * You'll **normally want to do this when you want a different string representation of an object**.
  * Overall, **it???s important to familiarize yourself with some of the common ```Object``` methods and make sure to not accidentally override them** as this can have devastating consequences for your application.
