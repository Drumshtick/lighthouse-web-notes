# Collections (Ref [here](https://rubystyle.guide/#collections))

## Literal Array and Hash
  * Prefer **literal array and hash creation notation** (***unless you need to pass parameters to their constructors***, that is).
    ```rb
      # bad
      arr = Array.new
      hash = Hash.new

      # good
      arr = []
      arr = Array.new(10)
      hash = {}
      hash = Hash.new(0)
    ```
### ```%w```
  * Prefer ```%w``` **to the literal array syntax when you need an array of words** (non-empty strings without spaces and special characters in them).
  * Apply this rule ***only to arrays with two or more elements.***
    ```rb
      # bad
      STATES = ['draft', 'open', 'closed']

      # good
      STATES = %w[draft open closed]
    ```
### ```%i```
  * Prefer ```%i``` to the literal array syntax **when you need an array of symbols** (and you don’t need to maintain Ruby 1.9 compatibility).
  * Apply this rule ***only to arrays with two or more elements***.
    ```rb
      # bad
      STATES = [:draft, :open, :closed]

      # good
      STATES = %i[draft open closed]
    ```
## No Trailing Array Commas
  * **Avoid comma after the last item of an Array or Hash literal**, especially when the items are not on separate lines.
    ```rb
      # bad - easier to move/add/remove items, but still not preferred
      VALUES = [
                1001,
                2020,
                3333,
              ]

      # bad
      VALUES = [1001, 2020, 3333, ]

      # good
      VALUES = [1001, 2020, 3333]
    ```
## No Gappy Arrays
  * Avoid the creation of huge gaps in arrays.
    ```rb
      arr = []
      arr[100] = 1 # now you have an array with lots of nils
    ```
### ```first``` and ```last```
  * When accessing the first or last element from an array, prefer ```first``` or ```last``` over ```[0]``` or ```[-1]```
## ```Set``` vs ```Array```
  * Use ```Set``` instead of ```Array``` ***when dealing with unique elements.***
  * ```Set``` **implements a collection of unordered values with no *duplicates*.**
  * This is a hybrid of Array's intuitive inter-operation facilities and Hash's fast lookup.
## Symbols as Keys
  * **Prefer symbols** instead of strings **as hash keys**.
    ```rb
      # bad
      hash = { 'one' => 1, 'two' => 2, 'three' => 3 }

      # good
      hash = { one: 1, two: 2, three: 3 }
    ```
## No Mutable Keys
  * Avoid the **use of mutable objects as hash keys**.
  * Keys should remain constant
## Hash Literals
  * Use the Ruby 1.9 hash literal syntax **when your hash keys are symbols**.
    ```rb
      # bad
      hash = { :one => 1, :two => 2, :three => 3 }

      # good
      hash = { one: 1, two: 2, three: 3 }
    ```
# Hash Literal Values
  * Ruby 3.1 hash literal value syntax **when your hash key and value are the same.**
    ```rb
      # bad
      hash = { one: one, two: two, three: three }

      # good
      hash = { one:, two:, three: }
    ```
## Hash Literal as Last Array Item
  * Wrap hash literal braces **if it is a last array item**.
    ```rb
      # bad
      [1, 2, one: 1, two: 2]

      # good
      [1, 2, { one: 1, two: 2 }]
    ```
## No Mixed Hash Syntaxes
  * Don’t mix the Ruby 1.9 **hash syntax with hash rockets in the same hash literal**.
  * **When you’ve got keys that are not symbols stick to the hash rockets syntax.**
  * Don't mix them! Rocket or colons NOT BOTH
    ```rb
      # bad
      { a: 1, 'b' => 2 }

      # good
      { :a => 1, 'b' => 2 }
    ```
_______________________________________________________________________________________________________________________________________________________________________________________
  * **HASH ROCKET**
    * ```key => value``` used to define a hash key/value pair 
________________________________________________________________________________________________________________________________________________________________________________________________________________
## Avoid ```Hash[]``` constructor
  * ```Hash::[]``` was **a pre-Ruby 2.1 way of constructing hashes from arrays of key-value pairs**, or from a flat list of keys and values.
  * It has an obscure semantic and looks cryptic in code.
  * Since Ruby 2.1, ```Enumerable#to_h``` **can be used to construct a hash from a list of key-value pairs**, and ***it should be preferred***.
  * Instead of ```Hash[]``` with a list of literal keys and values, ***just a hash literal should be preferred***.
    ```rb
      # bad
      Hash[ary]
      Hash[a, b, c, d]

      # good
      ary.to_h
      {a => b, c => d}
    ```
### ```Hash#key?```
  * **Use ```Hash#key?```** ***instead of ```Hash#has_key?```*** **and ```Hash#value?```** ***instead of ```Hash#has_value?```.***
    ```rb
      # bad
      hash.has_key?(:test)
      hash.has_value?(value)

      # good
      hash.key?(:test)
      hash.value?(value)
    ```
### ```Hash#each```
  * **Use** ```Hash#each_key``` ***instead of*** ```Hash#keys.each``` and ```Hash#each_value``` ***instead of*** ```Hash#values.each```.
    ```rb
      # bad
      hash.keys.each { |k| p k }
      hash.values.each { |v| p v }
      hash.each { |k, _v| p k }
      hash.each { |_k, v| p v }

      # good
      hash.each_key { |k| p k }
      hash.each_value { |v| p v }
    ```
### ```Hash#fetch```
  * Use ```Hash#fetch``` **when dealing with hash keys *that should be present***.
  * It will return a more specific error message if key is mistyped
    ```rb
      heroes = { batman: 'Bruce Wayne', superman: 'Clark Kent' }
      # bad - if we make a mistake we might not spot it right away
      heroes[:batman] # => 'Bruce Wayne'
      heroes[:supermann] # => nil

      # good - fetch raises a KeyError making the problem obvious
      heroes.fetch(:supermann)
    ```
### ```Hash#fetch``` defaults
  * Introduce **default values for hash keys via ```Hash#fetch```** as opposed to using custom logic.
    ```rb
      batman = { name: 'Bruce Wayne', is_evil: false }

      # bad - if we just use || operator with falsy value we won't get the expected result
      batman[:is_evil] || true # => true

      # good - fetch works correctly with falsy values
      batman.fetch(:is_evil, true) # => false
    ```
## Use Hash Blocks
  * Prefer the **use of the block instead of the default value** in ```Hash#fetch```*** if the code that has to be evaluated may have side effects or be expensive***.
    ```rb
      batman = { name: 'Bruce Wayne' }

      # bad - if we use the default value, we eager evaluate it
      # so it can slow the program down if done multiple times
      batman.fetch(:powers, obtain_batman_powers) # obtain_batman_powers is an expensive call

      # good - blocks are lazy evaluated, so only triggered in case of KeyError exception
      batman.fetch(:powers) { obtain_batman_powers }
    ```
### ```Hash#values_at```
  * Use ```Hash#values_at``` **when you need to retrieve *several values consecutively* from a hash**.
    ```rb
      # bad
      email = data['email']
      username = data['nickname']

      # good
      email, username = data.values_at('email', 'nickname')
    ```
### ```Hash#transform_keys``` and ```Hash#transform_values```
  * Prefer ```transform_keys``` or ```transform_values``` over ```each_with_object``` or ```map``` **when transforming just the *keys* or just the *values* of a hash**.
    ```rb
      # bad
      {a: 1, b: 2}.each_with_object({}) { |(k, v), h| h[k] = v * v }
      {a: 1, b: 2}.map { |k, v| [k.to_s, v] }.to_h

      # good
      {a: 1, b: 2}.transform_values { |v| v * v }
      {a: 1, b: 2}.transform_keys { |k| k.to_s }
    ```
## Ordered Hashes
  * ***Rely on the fact that as of Ruby 1.9 hashes are ordered***
## No Modifying Collections
  * ***Do not modify a collection while traversing it***.
## Accessing Elements Directly
  * When accessing elements of a collection, avoid direct access via ```[n]``` by using an alternate form of the reader method if it is supplied.
  * This guards you from calling ```[]``` on ```nil```.
    ```rb
      # bad
      Regexp.last_match[1]

      # good
      Regexp.last_match(1)
    ```
## Provide Alternate Accessor to Collections
  * When providing an accessor for a collection, **provide an alternate form to save users from checking for ```nil``` before accessing an element in the collection.**
    ```rb
      # bad
      def awesome_things
        @awesome_things
      end

      # good
      def awesome_things(index = nil)
        if index && @awesome_things
          @awesome_things[index]
        else
          @awesome_things
        end
      end
    ```
### ``map``/```find```/```select```/```reduce```/```include?```/```size```
  * Prefer ```map``` over ```collect```
  * ```find``` over ```detect```
  * ```select``` over ```find_all```
  * ```reduce``` over ```inject```
  * ```include?``` over ```member?```
  * ```size``` over ```length```
  * **This is not a hard requirement; if the use of the alias enhances readability, it’s ok to use it.**
  * The rhyming methods are inherited from Smalltalk and are not common in other programming languages.
  * The reason **the use of ```select``` is encouraged over ```find_all```** is that ***it goes together nicely with ```reject``` and its name is pretty self-explanatory***.
### ```count``` vs ```size```
  * **Don’t use ```count``` as a substitute for ```size```.** ***For ```Enumerable``` objects other than ```Array``` it will iterate the entire collection in order to determine its size.***
    ```rb
      # bad
      some_hash.count

      # good
      some_hash.size
    ```
### ```flat_map```
  * Use ```flat_map``` instead of ```map``` + ```flatten```.
  * This ***does not apply for arrays with a depth greater than 2***, 
    * i.e. if ```users.first.songs == ['a', ['b','c']]```, ***then use ```map``` + ```flatten``` rather than ```flat_map```.***
  * ```flat_map``` ***flattens the array by 1***, whereas ***```flatten``` flattens it all the way***.
    ```rb
      # bad
      all_songs = users.map(&:songs).flatten.uniq

      # good
      all_songs = users.flat_map(&:songs).uniq
    ```
### ```reverse_each```
  * ***Prefer ```reverse_each``` to ```reverse.each``` because some classes that include Enumerable will provide an efficient implementation***.
  * Even in the worst case where a class does not provide a specialized implementation, the general implementation inherited from Enumerable will be at least as efficient as using ```reverse.each```.
    ```rb
      # bad
      array.reverse.each { ... }

      # good
      array.reverse_each { ... }
    ```
