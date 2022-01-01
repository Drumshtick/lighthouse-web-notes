# Source Code Layout (Ref [here](https://rubystyle.guide/#source-code-layout))
________________________________________________________________________________________________________________________________________________________________________________________________________________
      Nearly everybody is convinced that every style but their own is ugly and unreadable.
      Leave out the "but their own" and they’re probably right…
                                                                  — Jerry Coffin (on indentation)
________________________________________________________________________________________________________________________________________________________________________________________________________________

## Source Encoding
  * Use ```UTF-8``` **as the source file encoding**.
    * ```UTF-8``` **has been the default source file encoding** since ```Ruby 2.0```.
## Tabs or Spaces?
  * Use **only spaces for indentation**. ***No hard tabs***.
    * **Hard Tabs** - are made by the 'Tab' button. This can create inconsistencies depending on the IDE used to read and write on the source file
## Indentation
  * Use two spaces per indentation level
## Maximum Line Length
  * 80 Chars per line
## No Trailing Whitespace
  * Avoid trailing whitespace.
## Line Endings
  * Use Unix-style line endings.
    * Line endings:
      1. ```\r\n``` : Windows style
      2. ```\n``` : ***UNIX style (Including Mac OSX)***
      3. ```\r``` : Mac style (pre-OSX)
  * use this git command to ensure Windows line endings arent accidentally used
    ```sh
      git config --global core.autocrlf true
    ```
## Should I Terminate Files with a Newline?
  * End each file with a newline.
  * This should **be done via editor configuration**, not manually.
    * Called "Insert final newline"
## Should I Terminate Expressions with ```;```?
  * Don’t use ```;``` to terminate statements and expressions.
## One Expression Per Line
  * Use one expression per line.
## Spaces and Operators
  * Use spaces **around operators**, after **commas**, **colons** and **semicolons**.
  * Whitespace might be (mostly) irrelevant to the Ruby interpreter, **but its proper use is the key to writing easily readable code.**
  ```rb
    # bad
    sum=1+2
    a,b=1,2
    class FooError<StandardError;end

    # good
    sum = 1 + 2
    a, b = 1, 2
    class FooError < StandardError; end
  ```
  * There are **a few exceptions**:
    * **Exponent operator**:
      ```rb
        # bad
        e = M * c ** 2

        # good
        e = M * c**2
      ```
    * Slash in **rational literals**:
      ```rb
        # bad
        o_scale = 1 / 48r

        # good
        o_scale = 1/48r
      ```
    * **Safe navigation operator**:
      * Safe navigation operator - lets you call methods on objects without 
      worrying that the object may be ```nil```
      (Avoiding an undefined method for ```nil:NilClass``` error), similar 
      to the ```try``` method in Rails
      ```rb
      # bad
      foo &. bar
      foo &.bar
      foo&. bar

      # good
      foo&.bar
      ```
## Spaces and Braces
  * **No spaces after** ```(```, ```[``` or before ```]```, ```)```.
  * **Use spaces** around ```{``` and before ```}```. 
    ```rb
      # bad
      some( arg ).other
      [ 1, 2, 3 ].each{|e| puts e}

      # good
      some(arg).other
      [1, 2, 3].each { |e| puts e }
    ```
  * ```{``` and ```}``` deserve a bit of clarification, **since they are used for block and hash literals**, as well as **string interpolation**.
    * For **hash literals** ***two styles*** are considered acceptable.
      1. Slightly **more readable** (and arguably more popular in the Ruby community in general).
      2. Advantage of **adding visual difference between block and hash literals**. Whichever one you pick - ***apply it consistently.***
      ```rb
        # good - space after { and before }
        { one: 1, two: 2 }

        # good - no space after { and before }
        {one: 1, two: 2}
      ```
    * With **interpolated expressions**, there should be **no padded-spacing inside the braces**.
      ```rb
        # bad
        "From: #{ user.first_name }, #{ user.last_name }"

        # good
        "From: #{user.first_name}, #{user.last_name}"
      ```
## No space after bang ```!```
  * No space after ```!```. 
## No Space inside Range Literals
  * No space inside range literals.
    ```rb
      # bad
      1 .. 3
      'a' ... 'z'

      # good
      1..3
      'a'...'z'
    ```
## Indent ```when``` to ```case```
  * Indent ```when``` as deep as ```case```.
    ```rb
      # bad
      case
        when song.name == 'Misty'
          puts 'Not again!'
        when song.duration > 120
          puts 'Too long!'
        when Time.now.hour > 21
          puts "It's too late"
        else
          song.play
      end

      # good
      case
      when song.name == 'Misty'
        puts 'Not again!'
      when song.duration > 120
        puts 'Too long!'
      when Time.now.hour > 21
        puts "It's too late"
      else
        song.play
      end
    ```
## Indent Conditional Assignment
  * When **assigning the result of a conditional expression to a variable**, ***preserve the usual alignment of its branches***.
    ```rb
      # bad - pretty convoluted
      kind = case year
      when 1850..1889 then 'Blues'
      when 1890..1909 then 'Ragtime'
      when 1910..1929 then 'New Orleans Jazz'
      when 1930..1939 then 'Swing'
      when 1940..1950 then 'Bebop'
      else 'Jazz'
      end

      result = if some_cond
        calc_something
      else
        calc_something_else
      end

      # good - it's apparent what's going on
      kind = case year
            when 1850..1889 then 'Blues'
            when 1890..1909 then 'Ragtime'
            when 1910..1929 then 'New Orleans Jazz'
            when 1930..1939 then 'Swing'
            when 1940..1950 then 'Bebop'
            else 'Jazz'
            end

      result = if some_cond
                calc_something
              else
                calc_something_else
              end

      # good (and a bit more width efficient)
      kind =
        case year
        when 1850..1889 then 'Blues'
        when 1890..1909 then 'Ragtime'
        when 1910..1929 then 'New Orleans Jazz'
        when 1930..1939 then 'Swing'
        when 1940..1950 then 'Bebop'
        else 'Jazz'
        end

      result =
        if some_cond
          calc_something
        else
          calc_something_else
        end
    ```
## Empty Lines between Methods
  * **Use empty lines between method definitions** and also to **break up methods into logical paragraphs internally**. 
    ```rb
      # bad
      def some_method
        data = initialize(options)
        data.manipulate!
        data.result
      end
      def some_other_method
        result
      end

      # good
      def some_method
        data = initialize(options)

        data.manipulate!

        data.result
      end

      def some_other_method
        result
      end
    ```
## Two or More Empty Lines
  * Don’t use several empty lines in a row.
    ```rb
      # bad - It has two empty lines.
      some_method


      some_method

      # good
      some_method

      some_method
    ```
## Empty Lines around **Attribute Accessor**
  * Use empty lines around attribute accessor.
    ```rb
      # bad
      class Foo
        attr_reader :foo
        def foo
          # do something...
        end
      end

      # good
      class Foo
        attr_reader :foo

        def foo
          # do something...
        end
      end
    ```
## Empty Lines around Access Modifier
  * Use empty lines around access modifier.
    ```rb
      # bad
      class Foo
        def bar; end
        private
        def baz; end
      end

      # good
      class Foo
        def bar; end

        private

        def baz; end
      end
    ```
## Empty Lines around Bodies
  * Don’t use empty lines around method, class, module, block bodies. 
    ```rb
      # bad
      class Foo

        def foo

          begin

            do_something do

              something

            end

          rescue

            something

          end

          true

        end

      end

      # good
      class Foo
        def foo
          begin
            do_something do
              something
            end
          rescue
            something
          end
        end
      end
    ```

## Trailing Comma in Method Arguments
  * Avoid comma after the last parameter in a method call, **especially when the parameters are not on separate lines.**
    ```rb
      # bad - easier to move/add/remove parameters, but still not preferred
      some_method(
        size,
        count,
        color,
      )

      # bad
      some_method(size, count, color, )

      # good
      some_method(size, count, color)
    ```
## Spaces around Equals
  * Use spaces around the = operator when assigning default values to method parameters:
    ```rb
      # bad
      def some_method(arg1=:default, arg2=nil, arg3=[])
        # do something...
      end

      # good
      def some_method(arg1 = :default, arg2 = nil, arg3 = [])
        # do something...
      end
    ```
  * While several Ruby books suggest the first style, the second is much more prominent in practice (and arguably a bit more readable).
## Line Continuation in Expressions 
  * Avoid line continuation with ```\``` where not required. In practice, avoid using line continuations for anything but string concatenation.
    ```rb
      # bad (\ is not needed here)
      result = 1 - \
              2

      # bad (\ is required, but still ugly as hell)
      result = 1 \
              - 2

      # good
      result = 1 -
              2

      long_string = 'First part of the long string' \
                    ' and second part of the long string'
    ```
## Multi-line Method Chains
  * Adopt a consistent multi-line method chaining style.
  * There are two popular styles in the Ruby community, both of which are considered good - **leading** ```.``` and **trailing** ```.```.
    1. Leading ```.```
      * When continuing a chained method call on another line, keep the . on the second line.
      ```rb
        # bad - need to consult first line to understand second line
        one.two.three.
          four

        # good - it's immediately clear what's going on the second line
        one.two.three
          .four
      ```
    2. Trailing ```.```
      * When continuing a chained method call on another line, include the . on the first line to indicate that the expression continues.
      ```rb
        # bad - need to read ahead to the second line to know that the chain continues
        one.two.three
          .four

        # good - it's immediately clear that the expression continues beyond the first line
        one.two.three.
          four
      ```
## Method Arguments Alignment
  * Align the arguments of a method call if they span more than one line.
  * When aligning arguments is not appropriate due to line-length constraints, single indent for the lines after the first is also acceptable.
    ```rb
      # starting point (line is too long)
      def send_mail(source)
        Mailer.deliver(to: 'bob@example.com', from: 'us@example.com', subject: 'Important message', body: source.text)
      end

      # bad (double indent)
      def send_mail(source)
        Mailer.deliver(
            to: 'bob@example.com',
            from: 'us@example.com',
            subject: 'Important message',
            body: source.text)
      end

      # good
      def send_mail(source)
        Mailer.deliver(to: 'bob@example.com',
                      from: 'us@example.com',
                      subject: 'Important message',
                      body: source.text)
      end

      # good (normal indent)
      def send_mail(source)
        Mailer.deliver(
          to: 'bob@example.com',
          from: 'us@example.com',
          subject: 'Important message',
          body: source.text
        )
      end
    ```
## Space in Method Calls
  * Do not put a space between a method name and the opening parenthesis.
    ```rb
      # bad
      puts (x + y)

      # good
      puts(x + y)
    ```
## Space in Brackets Access
  * Do not put a space between a receiver name and the opening brackets.
    ```rb
      # bad
      collection [index_or_key]

      # good
      collection[index_or_key]
    ```
## Multi-line Arrays Alignment
  * Align the elements of array literals spanning multiple lines.
    ```rb
      # bad - single indent
      menu_item = %w[Spam Spam Spam Spam Spam Spam Spam Spam
        Baked beans Spam Spam Spam Spam Spam]

      # good
      menu_item = %w[
        Spam Spam Spam Spam Spam Spam Spam Spam
        Baked beans Spam Spam Spam Spam Spam
      ]

      # good
      menu_item =
        %w[Spam Spam Spam Spam Spam Spam Spam Spam
          Baked beans Spam Spam Spam Spam Spam]
    ```
# Naming Conventions
## Snake Case for Symbols, Methods and Variables
  * Use ```snake_case``` for ```symbols```, ```methods``` and ```variables```.
## Identifiers with a Numeric Suffix
  * **Do not separate numbers** from letters on symbols, methods and variables.
    ```rb
      # bad
      :some_sym_1

      some_var_1 = 1

      var_10 = 10

      def some_method_1
        # some code
      end

      # good
      :some_sym1

      some_var1 = 1

      var10 = 10

      def some_method1
        # some code
      end
    ```
## CapitalCase for ```Classes``` and ```Modules```
  * Use ```CapitalCase``` for ```classes``` and ```modules```. ***(Keep acronyms like HTTP, RFC, XML uppercase)***.
## Snake Case for Files
  * Use ```snake_case``` for naming files, e.g. ```hello_world.rb```
## Snake Case for Directories
  * Use ```snake_case``` for naming directories, e.g. ```lib/hello_world/hello_world.rb```.
## ***One Class per File***
  * Aim to have just **a single class/module per source file**.
  * ***Name the file name as the class/module***, but **replacing CapitalCase with** ```snake_case```.
## Screaming Snake Case for Constants
  * Use ```SCREAMING_SNAKE_CASE``` for other constants (those that don’t refer to classes and modules). 
________________________________________________________________________________________________________________________________________________________________________________________________________________
## Predicate Methods Suffix
  * The names of **predicate methods** (***methods that return a boolean value***) **should end in a question mark** (i.e. ```Array#empty?```).
  * ***Methods that don’t return a boolean, shouldn’t end in a question mark.***
________________________________________________________________________________________________________________________________________________________________________________________________________________
## Predicate Methods Prefix
  * Avoid **prefixing predicate methods with the auxiliary verbs** such as **is**, **does**, or **can**.
  * **These words are redundant and inconsistent** with the style of boolean methods in the Ruby core library, such as ```empty?``` and ```include?```.
## Dangerous Method Suffix
  * The names of potentially dangerous methods (i.e. ***methods that modify ```self``` or the arguments***, ```exit!``` (doesn’t run the finalizers like exit does), etc) should end with an exclamation mark if there exists a safe version of that dangerous method.
    ```rb
      # bad - there is no matching 'safe' method
      class Person
        def update!
        end
      end

      # good
      class Person
        def update
        end
      end

      # good
      class Person
        def update!
        end

        def update
        end
      end
    ```
## Unused Variables Prefix
  * Prefix with ```_``` unused block parameters and local variables. It’s also acceptable to use just ```_``` (although it’s a bit less descriptive). This convention is recognized by the Ruby interpreter and tools like RuboCop will suppress their unused variable warnings.
    ```rb
      # bad
      result = hash.map { |k, v| v + 1 }

      def something(x)
        unused_var, used_var = something_else(x)
        # some code
      end

      # good
      result = hash.map { |_k, v| v + 1 }

      def something(x)
        _unused_var, used_var = something_else(x)
        # some code
      end

      # good
      result = hash.map { |_, v| v + 1 }

      def something(x)
        _, used_var = something_else(x)
        # some code
      end
    ```
# Flow of Control
## ```for``` loops
  * **Do not use ```for```, *unless you know exactly why***.
  * **Most of the time iterators should be used instead**.
  * ```for``` is implemented in terms of ```each``` (**so you’re adding a level of indirection**), but with a twist - **```for``` doesn’t introduce a new scope** (unlike ```each```) and variables defined in its block will be visible outside it. 
    ```rb
      arr = [1, 2, 3]

      # bad
      for elem in arr do
        puts elem
      end

      # note that elem is accessible outside of the for loop
      elem # => 3

      # good
      arr.each { |elem| puts elem }

      # elem is not accessible outside each block
      elem # => NameError: undefined local variable or method `elem'
    ```
## then in Multi-line Expression
  * Do not use ```then``` **for multi-line ```if```/```unless```/```when```/```in```**.
    ```rb
      # bad
      if some_condition then
        # body omitted
      end

      # bad
      case foo
      when bar then
        # body omitted
      end

      # bad
      case expression
      in pattern then
        # body omitted
      end

      # good
      if some_condition
        # body omitted
      end

      # good
      case foo
      when bar
        # body omitted
      end

      # good
      case expression
      in pattern
        # body omitted
      end
    ```
## Condition Placement
  * Always put the **condition on the same line as the ```if```/```unless``` in a multi-line** conditional.
    ```rb
      # bad
      if
        some_condition
        do_something
        do_something_else
      end

      # good
      if some_condition
        do_something
        do_something_else
      end
    ```
## Ternary Operator vs if
  * Prefer the ternary operator(```?:```) over ```if```/```then```/```else```/```end``` constructs. ***It’s more common and obviously more concise***.
    ```rb
      # bad
      result = if some_condition then something else something_else end

      # good
      result = some_condition ? something : something_else
    ```
## Nested Ternary Operators
  * Use one expression per branch in a ternary operator. This also means that ternary operators must not be nested. Prefer if/else constructs in these cases.
## case vs if-else
  * Prefer case over if-elsif when compared value is the same in each clause.
## Returning Result from if/case
  * Leverage the fact that if and case are expressions which return a result. 
    ```rb
      # bad
      if condition
        result = x
      else
        result = y
      end

      # good
      result =
        if condition
          x
        else
          y
        end
    ```
## One-line Cases
  * Use ```when x then …​``` for one-line cases.
## Semicolon in in
  * Do not use ```in pattern; …​.``` Use ```in pattern then …​``` **for one-line in pattern branches**.
## ! vs not
  * Use ```!``` instead of ```not```.
## Double Negation
  * Avoid unnecessary uses of ```!!```
    ```rb
      # bad
      x = 'test'
      # obscure nil check
      if !!x
        # body omitted
      end

      # good
      x = 'test'
      if x
        # body omitted
      end

      # good
      def named?
        !name.nil?
      end

      # good
      def banned?
        !!banned_until&.future?
      end
    ```
## and/or
   * The ```and``` and ```or``` ***keywords are banned.*** The minimal added readability is just not worth the high probability of introducing subtle bugs. For boolean expressions, ***always use && and || instead.*** For flow control, use if and unless; && and || are also acceptable but less clear.
## Multi-line Ternary Operator
  * Avoid multi-line ```?:``` (the ternary operator); use ```if```/```unless``` instead.
## if as a Modifier
  * Prefer modifier ```if```/```unless``` usage **when you have a single-line body**.
  * Another good alternative is the usage of control flow ```&&```/```||```.
    ```rb
      # bad
      if some_condition
        do_something
      end

      # good
      do_something if some_condition

      # another good option SHORT CIRCUITING
      some_condition && do_something
    ```
## Nested Modifiers
  * Avoid nested modifier if/unless/while/until usage. Prefer &&/|| if appropriate.
    ```rb
      # bad
      do_something if other_condition if some_condition

      # good
      do_something if some_condition && other_condition
    ```
## if vs unless
  * Prefer ```unless``` over ```if``` for negative conditions (or control flow ```||```).
    ```rb
      # bad
      do_something if !some_condition

      # bad
      do_something if not some_condition

      # good
      do_something unless some_condition

      # another good option
      some_condition || do_something
    ```
## Using else with unless
  * Do not use ```unless``` with ```else```.
  * Rewrite these with the positive case first.
## Parentheses around Condition
  * Don’t use parentheses around the condition of a control expression.
## Multi-line while do
  * Do not use while/until condition do for multi-line while/until.
    ```rb
      # bad
      while x > 5 do
        # body omitted
      end

      until x > 5 do
        # body omitted
      end

      # good
      while x > 5
        # body omitted
      end

      until x > 5
        # body omitted
      end
    ```
## ```while``` as a Modifier
  * Prefer modifier ```while```/```until``` usage when you have a single-line body.
    ```rb
      # bad
      while some_condition
        do_something
      end

      # good
      do_something while some_condition
    ```
## ```while``` vs ```until```
  * Prefer ```until``` over ```while``` for negative conditions.
## Infinite Loop
  * Use ```Kernel#loop``` instead of ```while```/```until``` when you need an infinite loop.
    ```rb
      # bad
      while true
        do_something
      end

      until false
        do_something
      end

      # good
      loop do
        do_something
      end
    ```
