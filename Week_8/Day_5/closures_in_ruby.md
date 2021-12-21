# Closures in Ruby

You've worked with closures and higher-order functions in JavaScript (starting way back in week 1! That gives you bragging rights, by the way). These language features are often attributed to functional programming languages, **but, like JavaScript, Ruby includes these features too**.

## Is Ruby a Functional language?

While not strictly a "functional programming language", **Ruby does include language features inspired by the functional paradigm**, which support coding in a functional style, including the use of blocks, procs and lambdas as first-class objects, as well as support for closures.

#### link [HERE](https://stackoverflow.com/questions/159797/is-ruby-a-functional-language)

* **Whether a language is or is not a functional language is unimportant**. Functional Programming is a thesis, best explained by Philip Wadler (The Essence of Functional Programming) and John Hughes (Why Functional Programming Matters).
  * A meaningful question is, 'How amenable is Ruby to achieving the thesis of functional programming?' The answer is 'very poorly'.

## Closures in Ruby
The following reading speaks to how Blocks, Procs and Lambda work as closures in Ruby by allowing you to create Higher Order Functions:

#### link [HERE](https://www.eriktrautman.com/posts/ruby-explained-blocks-procs-and-lambdas-aka-closures)

Blocks and Procs **are both a type of "closure"**.
  * A closure is basically a formal, computer-science-y way of saying "***a chunk of code that you can pass around but which hangs onto the variables that you gave it when you first called it***". It's the blanket term used to refer to blocks and Procs and...

### **Blocks**
  * are chunks of code given as input to methods. Like ```.each``` or ```.map```
  * Blocks are just chunks of code that you can pick up and drop into another method as an input.
  * They're often called "anonymous functions" because they have no name but behave much like functions.
  * They're like little helper functions... you don't find blocks just hanging around without some method (like #each) using them.
  * You declare a block using squiggly braces ```{}```
  * Just like methods, **some blocks take inputs**, others do not. **Some return important information**, others do not. Blocks let you use the implicit return (whatever's on the last line) **but NOT return, since that will return you from whatever method actually called the block.**
  * DO NOT USE ```return``` INSIDE A BLOCK (it will exit the calling method)
  * How does #each take a block then?
    * Through the magic of the ```yield``` statement, which basically says "run the block right here".
    * When you write your own methods, you don't even need to specially declare that you'd like to accept a block. It will just be there waiting for you when you call yield inside your method.
    * yield can pass parameters to your block as well.
    * See this **made-up version of the ```#each``` method** to get an idea of what's happening under the hood.
      * We'll put this method into the Array class so you can call it directly on an array (like ```[1,2,3].my_each```) instead of having to take the array as an argument like ```my_each([1,2,3])```:
        ```rb
        class Array 
          def my_each
            i = 0
            while i < self.size
                yield(self[i])  
                i+=1      
            end
            self
          end
        end
        ```
      * As you can see, we iterate over the array that our ```#my_each``` method was called on (which can be grabbed using self).
      * Then we call the block that got passed to #my_each and pipe in whatever member of the original array we are currently on.
      * Last, we just return the original array because that's what #each does. We would run it just the same way as #each:
      ```irb
        > [1,2,3].my_each { |num| print "#{num}!" }
        1! 2! 3! => [1,2,3]
      ```
      * Which operates in that case just like all these lines:
      ```rb
      class Array
        def my_each
          i = 0
          while i < self.size
            print "#{self[i]}!"   # Our block got "subbed in" here
            i+=1
          end
          self
        end
      end
      ```
      * if you want to ask whether a block was passed at all (**to only yield in that case**), use ```#block_given?```, or rather: ```yield if block_given?```
### **Procs**
  * are related to blocks.
  * What if you want to pass TWO blocks to your function? What if you want to save your block to a variable so you can use it again later?
    * That's a job for Procs
  * aka ***Procedures***! 
  * Actually, a block is a Proc (***which is the class name for a block***) and they rhyme just to confuse you.
  * The block is sort of like a stripped-down and temporary version of a Proc that Ruby included just to make it really easy to use things like those ```#each``` iterators.
  * ***A Proc is just a block that you save to a variable, thereby giving it a bit more permanence:***
  ```rb
    my_proc = Proc.new { |arg1| print "#{arg1}! " }
  ```
  * Use that block of code (now called a Proc) **as an input to a function by prepending it with an ampersand ```&```**:
  ```rb
    > [1,2,3].each(&my_proc)
      1! 2! 3! =>[1,2,3]
  ```
  * When you create your own function to accept procs, **the guts need to change a little bit because you'll need to use ```#call``` instead of ```yield``` inside** (***because which proc would yield run if you had more than one?***).
  * ```#call``` literally just runs the Proc that is called on. You can give it arguments as well to pass on to the Proc:
  ```rb
  my_proc = Proc.new { |arg1| print "#{arg1}! " }
  > my_proc.call("howdy ")
        howdy => nil
  ```
  * Most of the time, using a block is more than sufficient, especially in your early projects.
  * Once you start seeing the need for using a Proc (**like passing multiple arguments or saving it for later as a callback**), you'll have Procs there waiting for you.

### **Lambda**
  * Lambdas are sort of a more-fleshed-out version of Procs.
  * They are **one step closer to being actual methods** themselves, ***but still technically count as anonymous functions***.
    * If you're coming from Javascript, anonymous functions shouldn't be anything new to you.
  * the *differences between lambdas and Procs*, **a lambda acts more like a real method**. What does that mean?
    * A lambda gives you **more flexibility with what it returns** (***like if you want to return multiple values at once***) because **you can safely use the explicit ```return``` statement** inside of one. 
      * With lambdas, ```return``` **will only return from the lambda itself and not the enclosing method**, *which is what happens if you use return inside a block or Proc.*
    * Lambdas are also much **stricter than Procs about you passing them the correct number of arguments** (***you'll get an error*** if you pass the wrong number).
  * Here's a simple example to show you the syntax of a lambda (btw, there's nothing special to lambdas about placing the ```#call``` after the end, if you hadn't seen that done before, it's just like method chaining):
    ```rb
      > lambda do |word| 
      >   puts word
      >   return word            # you can do this in lambdas not Procs
      > end.call("howdy ")
      howdy => "howdy "        # not nil because we gave it a return
    ```
### **Method**s (capitalized because they're actually a class of their own)
  * a convenient way to **pass a normal method to another normal method by wrapping the symbol of its name in the word** ```method()```
  ```rb
    class Array
      def my_each(some_method)
        i = 0
        while i < self.size
          some_method.call(self[i])
          i+=1
        end
      end
      self
    end

    def print_stuff(word)
      print "#{word}! "
    end

    > [1,2,3].my_each(method(:print_stuff))    # symbolize the name!
    1! 2! 3! => nil
  ```

## Conclusion
* **Blocks** are unnamed little code chunks you can drop into other methods. Used all the time.
* **Procs** are identical to blocks but you can store them in variables, which lets you pass them into functions as explicit arguments and save them for later. Used explicitly sometimes.
* **Lambdas** are really full methods that just haven't been named. Used rarely.
* **Methods** are a way of taking actual named methods and passing them around as arguments to or returns from other methods in your code. Used rarely.
* **Closure** is just the umbrella term for all four of those things, which all somehow involve passing around chunks of code.