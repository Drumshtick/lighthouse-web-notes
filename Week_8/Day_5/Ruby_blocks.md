# Ruby Blocks

## Blocks and Yield in Ruby [Stackoverflow topic](http://stackoverflow.com/questions/3066703/blocks-and-yields-in-ruby)

* In Ruby, methods can receive a code block in order to perform arbitrary segments of code.

* When a method expects a block, you can invoke it with the ```yield``` function.

EX
* Take ```Person```, a class with a ```name``` attribute and a ```do_with_name``` method.
* When the method is invoked it will pass the ```name``` attribute to the block.
```rb
class Person
  def initialize( name )
    @name = name
  end

  def do_with_name # This method expects a block
    yield( @name )  # invoke the block and pass the @name attribute
  end
end
```

Now invoke the method and pass an arbitrary code block.
```rb
person = Person.new("Oscar")

#Invoking the method passing a block to print the value
person.do_with_name do |value|
  puts "Got: #{value}"
end
```
Outputs
```sh
Got: Oscar
```

The same method can be invoked with a **DIFFERENT BLOCK**
```rb
reversed_name = ""

#Invoke the method passing a different block
person.do_with_name do |value|
  reversed_name = value.reverse
end

puts reversed_name # Outputs: "racsO"
```

In the wild EX
```rb
# Filter element in an array
 days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]  

 # Select those which start with 'T' 
 days.select do | item |
     item.match /^T/
 end

=> ["Tuesday", "Thursday"]
```

Or sort by name length:
```rb
 days.sort do |x,y|
    x.size <=> y.size
 end

=> ["Monday", "Friday", "Tuesday", "Thursday", "Wednesday"]
```

If the block is optional you can use:
```rb
yield(value) if block_given?
```
If is not optional, just invoke it.

* **If arguments are how we pass in data to methods**, ***blocks* are how we pass in *behavior***. Think of them as a chunk of logic that your method can run.
* Look at the [Enumerable#select](https://ruby-doc.org/core-3.0.3/Enumerable.html#method-i-select) (which you'd normally call on an Array) or [#detect](http://ruby-doc.org/core/Enumerable.html#method-i-detect) methods which use blocks to get their job done.
* In Ruby, blocks can be passed into methods as a sort of "invisible argument," like this:
```rb
def print_result
  result_from_block = yield
  puts result_from_block
end

# This will print out the number 9 to the console
print_result { 3 * 3 }
```

As you will notice, the call to ```yield``` in the method definition ***is where the block is executed***.

Here are more examples of how print_result can be used:

```rb 
# Blocks can also be written using the do...end format
print_result do
  creature = "walrus"
  "I am the #{creature}!"
end
```

```rb 
# Check this out: blocks have access to variables outside of their definition
shopping_list = [:milk, :eggs, :cheese]
print_result do
  # select one at random
  important_item = shopping_list.sample
  "I hope I don't forget #{important_item}!"
end
```
Note also that it looks like print_result is being passed in a hash where in fact it is being passed in a block. **Writing it this way does indeed mean something different:**
```rb
print_result({3 * 3})
```

This **is in fact invalid syntax because we are declaring a (invalid) hash instead of a block** to be passed in as the first argument to print_result. It is invalid because **hash syntax is ```{ key: value, key2: value2, ...}```.**

### Example 2: Alternative Syntax

Another way to accept a block as an argument into a function **is to be more explicit when defining the argument list:**
```rb
def print_result(&block)  # Explicitly state a block is the arg
  result_from_block = block.call
  puts result_from_block
end
```

### Blocks === Callbacks?
By now you likely appreciate that passing in a block into a Ruby method is much like passing a callback function into a JavaScript function. The syntax is different of course but the pattern is quite similar.