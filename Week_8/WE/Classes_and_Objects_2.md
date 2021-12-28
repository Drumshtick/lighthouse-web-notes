# Classes_and_Objects_2.md (Ref [HERE](https://launchschool.com/books/oo_ruby/read/classes_and_objects_part2))
## Class Methods
  * Thus far, **all the methods we've created are instance methods.**
  * That is, **they are methods that pertain to an instance or object of the class**.
  * **There are also *class level methods***, called *class methods*.
  * **Class methods** **are methods we can call directly on the class itself**, ***without having to instantiate any objects***.
  * We haven't implemented any class methods at this point, so let's do that now.
  * **When defining a class method**, we ***prepend the method name with the reserved word self.***, like this:
  ```rb
      # ... rest of code ommitted for brevity

      def self.what_am_i         # Class method definition
        "I'm a GoodDog class!"
      end
  ```
  * Then when we call the class method, **we use the class name ```GoodDog``` followed by the method name**, without even having to instantiate any objects, like this:
  ```rb
    GoodDog.what_am_i          # => I'm a GoodDog class!
  ```
  * Why do we need a class method for this?
    * This example is a little contrived, but ***class methods are where we put functionality that does not pertain to individual objects***.
    * **Objects contain state**, and ***if we have a method that does not need to deal with states, then we can just use a class method***, like our simple example. We'll take a look at a more useful example in the next section.
  
## Class Variables
  * Just as instance variables capture information related to specific instances of classes (i.e., objects), **we can create variables for an entire class that are appropriately named *class variables***. 
  * **Class variables** are **created using two ```@``` symbols like so: ```@@```.**
  * Let's create a class variable and a class method to view that variable.
  ```rb
    class GoodDog
      @@number_of_dogs = 0

      def initialize
        @@number_of_dogs += 1
      end

      def self.total_number_of_dogs
        @@number_of_dogs
      end
    end

    puts GoodDog.total_number_of_dogs   # => 0

    dog1 = GoodDog.new
    dog2 = GoodDog.new

    puts GoodDog.total_number_of_dogs   # => 2
  ```
  * We have a class variable called ```@@number_of_dogs```, which we initialize to 0.
  * Then **in our constructor** (the initialize method), **we increment that number by 1**.
  * Remember that **initialize gets called every time we instantiate a new object via the ```new``` method**.
  * This also ***demonstrates that we can access class variables from within an instance method*** (**initialize is an instance method**).
  * Finally, we just **return the value of the class variable in the class method** ```self.total_number_of_dogs```.
  * This is ***an example of using a class variable and a class method to keep track of a class level detail that pertains only to the class, and not to individual objects***.

## Constants
  * When creating classes **there may also be certain variables that you never want to change**.
  * You can do this by **creating what are called *constants***. You **define a constant by using an upper case letter at the beginning of the variable name**.
  * **While technically constants just need to begin with a capital letter, *most Rubyists will make the entire variable uppercase*.**
  ```rb
    class GoodDog
      DOG_YEARS = 7

      attr_accessor :name, :age

      def initialize(n, a)
        self.name = n
        self.age  = a * DOG_YEARS
      end
    end

    sparky = GoodDog.new("Sparky", 4)
    puts sparky.age             # => 28
  ```
  * Here we used the constant ```DOG_YEARS``` to calculate the age in dog years when we created the object, sparky.
  * Note that we used the setter methods in the initialize method to initialize the ```@name``` and ```@age``` instance variables given to us by the ```attr_accessor``` method.
  * We then used the age getter method to retrieve the value from the object.
  * ```DOG_YEARS``` ***is a variable that will never change*** for any reason so we use a constant.
    * **It is possible to reassign a new value to constants but *Ruby will throw a warning***.
## The to_s Method
  * The ```to_s``` **instance method** ***comes built in to every class in Ruby***. In fact, we have been using it all along.
    * For example, suppose we have the ```GoodDog``` class from above, **and the ```sparky``` object as well from above**.
    ```sh
      puts sparky      # => #<GoodDog:0x007fe542323320>
    ```
    * What's happening here is that the **```puts``` method automatically calls ```to_s``` on its argument**, which in this case is the sparky object.
    * In other words  ```puts sparky``` **is equivalent to** ```puts sparky.to_s```.
    * The reason we get this particular output lies within the ```to_s``` method in Ruby.
    * **By default, the ```to_s``` method returns the name of the *object's class* and an encoding of the *object id***.
    * ***NOTE:***
      * <u>**puts method calls ```to_s``` for any argument that is not an array. For an array, it writes on separate lines the result of calling to_s on each element of the array.**</u>
    * To test this, **we can add a custom ```to_s``` method to our ```GoodDog``` class, overriding the default ```to_s``` that comes with Ruby.**
    ```rb
      class GoodDog
        DOG_YEARS = 7

        attr_accessor :name, :age

        def initialize(n, a)
          @name = n
          @age  = a * DOG_YEARS
        end

        def to_s
          "This dog's name is #{name} and it is #{age} in dog years."
        end
      end
    ```
    * Now the puts statement (```puts sparky```) prints:
    ```rb
      puts sparky      # => This dog's name is Sparky and is 28 in dog years.
    ```
    * And yes, it works! We were able to change the output by overriding the ```to_s``` instance method.
  * **There's another method called ```p```** that's very similar to ```puts```, **except it doesn't call ```to_s``` on its argument**; ***it calls another built-in Ruby instance method called ```inspect```***. The ```inspect``` **method is very helpful for debugging purposes**, so we don't want to override it.
    ```rb
      p sparky         # => #<GoodDog:0x007fe54229b358 @name="Sparky", @age=28>
    ```
  * This output implies that ```p sparky``` ***is equivalent to*** ```puts sparky.inspect```.
  * Besides being called automatically when using ```puts```, **another important attribute of the ```to_s``` method is that it's also *automatically called in string interpolation***. We've seen this before when using integers or arrays in string interpolation:
  ```rb
    irb :001 > arr = [1, 2, 3]
    => [1, 2, 3]
    irb :002 > x = 5
    => 5
    irb :003 > "The #{arr} array doesn't include #{x}."
    => The [1, 2, 3] array doesn't include 5.
  ```
  * Here, the ```to_s``` **method is automatically called on the ```arr``` array object**, as well as the ```x``` integer object. **We'll see if we can include our sparky object in a string interpolation:**
  ```rb
    irb :001 > "#{sparky}"
    => "This dog's name is Sparky and it is 28 in dog years."
  ```
  * In summary, the ```to_s``` **method is called automatically on the object when we use it with *puts* or when used with *string interpolation***.
  * This fact may seem trivial at the moment, but knowing when ```to_s``` is called will help us understand how to read and write better OO code.
## More About ```self```
  * We talked about ```self``` earlier, but let's try to dive a little deeper so you can understand exactly what ```self``` is and how to understand what it's referencing. **```self``` can refer to different things depending on where it is used.**
  * For example, **so far we've seen *two* clear use cases for ```self```**:
    1. Use ```self``` **when calling setter methods from within the class**.
      * In our earlier example we showed that ```self``` was necessary in order for our ```change_info``` method to work properly. **We had to use ```self``` to allow Ruby to disambiguate between initializing a local variable and calling a setter method.**
    2. Use ```self``` for class method definitions.
  * Let's play around with self to see why the above two rules work. Let's assume the following code:
  ```rb
    class GoodDog
      attr_accessor :name, :height, :weight

      def initialize(n, h, w)
        self.name   = n
        self.height = h
        self.weight = w
      end

      def change_info(n, h, w)
        self.name   = n
        self.height = h
        self.weight = w
      end

      def info
        "#{self.name} weighs #{self.weight} and is #{self.height} tall."
      end
    end
  ```
  * This is our standard ```GoodDog``` class, and **we're using ```self``` whenever we call an instance method from within the class**. We know the rule to use ```self```, but what does ```self``` really represent here? Let's add one more instance method to help us find out.
  ```rb
    class GoodDog
      # ... rest of code omitted for brevity

      def what_is_self
        self
      end
    end
  ```
  * Now we can instantiate a new ```GoodDog``` object.
  ```rb
    sparky = GoodDog.new('Sparky', '12 inches', '10 lbs')
    p sparky.what_is_self
    # => #<GoodDog:0x007f83ac062b38 @name="Sparky", @height="12 inches", @weight="10 lbs">
  ```
  * That's interesting. **From within the class, when an instance method uses ```self```, it references the *calling object***. In this case, that's the sparky object.
  * Therefore, **from within the ```change_info``` method**, calling ```self.name=``` ***acts the same as calling ```sparky.name=``` from outside the class*** (you can't call sparky.name= inside the class, though, since it isn't in scope). **Now we understand why using ```self``` to call instance methods from within the class works the way it does!**
  * The ***other place we use ```self``` is when we're defining class methods***, like this:
  ```rb
    class MyAwesomeClass
      def self.this_is_a_class_method
      end
    end
  ```
  * When ```self``` **is prepended to a method definition**, **it is defining a class method**.
  * We talked about these earlier. In our ```GoodDog``` class method example, **we defined a class method called ```self.total_number_of_dogs```**. This method **returned the value of the class variable ```@@number_of_dogs```**. How is this possible? Let's use code to take a look:
  ```rb
    irb :001 > GoodDog
    => GoodDog
  ```
  * Thus, you can see that using ```self``` ***inside a class* but *outside an instance method* refers to the class itself**.
  * Therefore, **a method definition prefixed with ```self``` is the same as defining the method on the class**. That is, ```def self.a_method``` **is equivalent to** ```def GoodDog.a_method```. ***That's why it's a class method***; it's actually being defined on the class.
  _____________________________________________________________________________________________________________________________________________________________________
  * <u>***To be clear, from within a class...***</u>
    1. ```self```, ***inside* of an instance method**, ***references the instance (object) that called the method*** - the calling object. Therefore, ```self.weight=``` **is the same as** ```sparky.weight=```, in our example.
    2. ```self```, ***outside* of an instance method**, ***references the class and can be used to define class methods***. Therefore if we were to define a ```name``` class method, ```def self.name=(n)``` **is the same as** ```def GoodDog.name=(n)```.
  ______________________________________________________________________________________________________________________________________________________________________
  * Thus, we can see that ```self``` **is a way of being explicit about what our program is referencing and what our intentions are as far as behavior**.
  * ```self``` **changes depending on the scope** it is used in, so **pay attention to see if you're inside an instance method or not**.
  * ```self``` is a tricky concept to grasp in the beginning, but the more often you see its use, **the more you will understand object oriented programming**. If the explanations don't quite make sense, just memorize those two rules above for now.
## Summary
  * **Initializing objects** with the ```new``` method
  * How **instance variables keep track of** an object's **state**
  * Learning how ```attr_*``` methods **generate getters and setters**
  * Using **instance methods** to **perform operations on our objects**
  * Using **class methods** to perform ***operations at the class level***
  * **Assigning class variables** to **relate specifically to our class**
  * Assigning **constants** **that never change to perform operations** in our classes
  * How the ```to_s``` method is used and **that we've been using it implicitly** all along.
  * ***How and when to use ```self```***

## Exercises
* Add a class method to your MyCar class that calculates the gas mileage of any car.
  ```rb
    def self.mileage(litres, distance)
      puts "Gas mileage is approximately #{distance / litres} per/litre"
    end
  ```

* Override the to_s method to create a user friendly print out of your object.
  ```rb
    def to_s
      "The color of #{self.model} is #{self.color} and is from the year #{self.year}"
    end
  ```
    * NOTE: puts automatically calls to_s 
  * When running the following code...
    ```rb
      class Person
        attr_reader :name
        def initialize(name)
          @name = name
        end
      end

      bob = Person.new("Steve")
      bob.name = "Bob"
    ```
    * We get the following error...
    ```sh
      test.rb:9:in `<main>': undefined method `name=' for
        #<Person:0x007fef41838a28 @name="Steve"> (NoMethodError)
    ```
    * Why do we get this error and how do we fix it?
      * Because the programmer failed to create a setter method and only created a getter method
      * The programmer could use ```attr_accessor :name``` to solve this error