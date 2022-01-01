# Strings (Ref [here](https://rubystyle.guide/#collections))
## String Interpolation
  * **Prefer string interpolation and string formatting** ***to string concatenation***:
    ```rb
      # bad
      email_with_name = user.name + ' <' + user.email + '>'

      # good
      email_with_name = "#{user.name} <#{user.email}>"

      # good
      email_with_name = format('%s <%s>', user.name, user.email)
    ```
## Consistent string Literals
  * Adopt **a <u>*consistent*</u> string literal quoting style**.
  * There are **two popular styles** in the Ruby community, both of which are considered good - ***single quotes* by default** and ***double quotes* by default**.
## Single Quote
  * Prefer **single-quoted strings when you don’t need string interpolation or special symbols** such as ```\t```, ```\n```, ```'```, etc.
    ```rb
      # bad
      name = "Bozhidar"

      name = 'De\'Andre'

      # good
      name = 'Bozhidar'

      name = "De'Andre"
    ```
### Double Quote
  * Prefer double-quotes **unless your string literal contains ```"``` or *escape characters* you want to suppress**.
    ```rb
      # bad
      name = 'Bozhidar'

      sarcasm = "I \"like\" it."

      # good
      name = "Bozhidar"

      sarcasm = 'I "like" it.'
    ```
## No Character Literals
  * Don’t use the character literal syntax ```?x```. Since Ruby 1.9 **it’s basically redundant** - ```?x``` **would be interpreted as ```'x'```** (a string with a single character in it).
    ```rb
      # bad
      char = ?c # This is a string with a char in it!

      # good
      char = 'c'
    ```
## Curlies Interpolate
  * Don’t leave out ```{}``` around **instance and global variables being interpolated into a string**.
    ```rb
      class Person
        attr_reader :first_name, :last_name

        def initialize(first_name, last_name)
          @first_name = first_name
          @last_name = last_name
        end

        # bad - valid, but awkward
        def to_s
          "#@first_name #@last_name"
        end

        # good
        def to_s
          "#{@first_name} #{@last_name}"
        end
      end

      $global = 0
      # bad
      puts "$global = #$global"

      # good
      puts "$global = #{$global}"
    ```
## No to_s
  * Don’t use ```Object#to_s``` **on interpolated objects**. ***It’s called on them automatically.***
    ```rb
      # bad
      message = "This is the #{result.to_s}."

      # good
      message = "This is the #{result}."
    ```
## String Concatenation
  * Avoid using ```String#+``` **when you need to construct large data chunks**.
  * Instead, ***use*** ```String#<<```.
  * **Concatenation mutates the string instance in-place and is always faster** than ```String#+```, ***which creates a bunch of new string objects***.
    ```rb
      # bad
      html = ''
      html += '<h1>Page title</h1>'

      paragraphs.each do |paragraph|
        html += "<p>#{paragraph}</p>"
      end

      # good and also fast
      html = ''
      html << '<h1>Page title</h1>'

      paragraphs.each do |paragraph|
        html << "<p>#{paragraph}</p>"
      end
    ```
## Don’t Abuse gsub
  * Don’t use ```String#gsub``` **in scenarios in which you can use a faster and more specialized alternative**.
  * gsub replaces a pattern globally in a string
    ```rb
      url = 'http://example.com'
      str = 'lisp-case-rules'

      # bad
      url.gsub('http://', 'https://')
      str.gsub('-', '_')

      # good
      url.sub('http://', 'https://')
      str.tr('-', '_')
    ```
## String#chars
  * Prefer the use of ```String#chars``` over ```String#split``` with empty string or regexp literal argument.
    ```rb
      # bad
      string.split(//)
      string.split('')

      # good
      string.chars
    ```
## sprintf
  * Prefer the use of ```sprintf``` and its alias format **over the fairly cryptic ```String#%``` method**.
    ```rb
      # bad
      '%d %d' % [20, 10]
      # => '20 10'

      # good
      sprintf('%d %d', 20, 10)
      # => '20 10'

      # good
      sprintf('%<first>d %<second>d', first: 20, second: 10)
      # => '20 10'

      format('%d %d', 20, 10)
      # => '20 10'

      # good
      format('%<first>d %<second>d', first: 20, second: 10)
      # => '20 10'
    ```
## Named Format Tokens
  * When using named format string tokens, **favor** ```%<name>```s ***over*** ```%{name}``` **because it encodes information about the type of the value**.
    ```rb
      # bad
      format('Hello, %{name}', name: 'John')

      # good
      format('Hello, %<name>s', name: 'John')
    ```
## Long Strings
  * **Break long strings into multiple lines** but ***don’t concatenate them with*** ```+```.
  * If you want to add newlines, use ```heredoc```. Otherwise use ```\```:
    ```rb
      ## # bad
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. " +
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, " +
      "when an unknown printer took a galley of type and scrambled it to make a type specimen book."

      # good
      <<~LOREM
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      LOREM

      # good
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "\
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, "\
      "when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    ```
