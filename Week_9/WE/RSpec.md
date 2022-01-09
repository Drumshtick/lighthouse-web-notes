# RSpec (Ref [here](https://blog.teamtreehouse.com/an-introduction-to-rspec))
## NOTE
### Beware that it uses the old should syntax instead of the newer expect syntax.
## An Introduction to RSpec
  * In the Ruby world, we have a few different testing libraries. One of the ones that has gained a lot of popularity and use is [rspec](https://github.com/rspec/).
  * RSpec takes a slightly different approach to the idea of testing applications, **by testing behavior rather than only specific methods.**

## The Basics
  * RSpec gives you a way to encapsulate what you’re testing via the ```describe``` block, and it’s friend ```context```. In a general unit testing sense, we use ```describe``` to **describe the behavior of a class**:
  ```rb
    describe Hash do

    end
  ```
  * Tests are written using the ```it``` block. Here’s an example of how you might write a spec for the ```Hash``` class:
  ```rb
    describe Hash do
      it "should return a blank instance" do
        Hash.new.should == {}
      end
    end
  ```
  * Those are the basics of writing some rspec examples. **You can run the above by installing rspec via ```gem install rspec```** and putting that **code in a file called ```hash_spec.rb```** and typing:
  ```sh
    rspec hash_spec.rb
  ```
  * You should see something like the following:
  ```sh
  .

  Finished in 0.11021 seconds
  1 example, 0 failures
  ```
  * You can set up test state using the before and after directives. This will apply to anything in your describe block:
  ```rb
    describe Hash do
      before do
        @hash = Hash.new({:hello => 'world'})
      end

      it "should return a blank instance" do
        Hash.new.should == {}
      end

      it "hash the correct information in a key" do
        @hash[:hello].should == 'world'
      end
    end
  ```
  * The above code will create the ```@hash``` variable before each test is run.
  * There are **two arguments for before–** ```all``` and ```each```.
  * Using the ```all``` argument, **the setup will be done once before all of the tests in the block**, and ```:each``` **will be done before each individual test**.
  * The ```after``` directive has the **same options and runs the same way**, only after tests are completed. **This is most useful when tearing down the previous state of the tests**.
## RSpec Idioms
  *  We usually use the ```describe``` keyword **to describe methods**. Using a “```.```” **will signify that you’re testing a class method**, and using **“```#```” will signify that it’s an instance method.** Here’s how it might look for a made up class:
  ```rb
    describe MyClass do
      describe ".class_method_1" do
      end

      describe "#instance_method_1" do
      end
    end
  ```
  * The ```context``` method **does the same thing by letting you contextualize a block of your tests.** This **is extremely powerful** for test states **when you add more complicated setup and teardown code to really get in to your objects**. I’ll show you a bit more of a real life scenario by building a delicious burger class.
  * Let’s say that in our ```Burger``` class we’re trying to test the ```#apply_ketchup``` method. Someone may not want ketchup on their burger. Instead of judging them, we’ll **write a test for the class to not apply ketchup if someone doesn’t want it**:
  ```rb
    describe Burger do
      describe "#apply_ketchup" do
        context "with ketchup" do
          before do
            @burger = Burger.new(:ketchup => true)
            @burger.apply_ketchup
          end

          it "sets the ketchup flag to true" do
            @burger.has_ketchup_on_it?.should be_true
          end
        end

        context "without ketchup" do
          before do
            @burger = Burger.new(:ketchup => false)
            @burger.apply_ketchup
          end

          it "sets the ketchup flag to false" do
            @burger.has_ketchup_on_it?.should be_false
          end
        end
      end
    end
  ```
## Cleaning Up a Bit
  * The above pattern works but can **become a bit tiresome to repeat all the time.**
  * ```RSpec``` gives us **some helper methods to generalize it**.
  * We could rewrite the above using the ```let```** keyword to make the the variable automatically.** The ***variable would then get created the first time it is accessed:***
  ```rb
    describe Burger do
      describe "#apply_ketchup" do
        context "with ketchup" do
          let(:burger) { Burger.new(:ketchup => true) }
          before  { burger.apply_ketchup }

          it "sets the ketchup flag to true" do
            burger.has_ketchup_on_it?.should be_true
          end
        end

        context "without ketchup" do
          let(:burger) { Burger.new(:ketchup => false) }
          before  { burger.apply_ketchup }

          it "sets the ketchup flag to false" do
            burger.has_ketchup_on_it?.should be_false
          end
        end
      end
    end
  ```
  * This all works but we can **clean it up even further using the ```subject``` method**.
  * The ```subject``` **method tells rspec what we’re doing the tests on.** We’re going to combine that with the ```specify``` method in the next example.
  * The ```specify``` method **is just like the ```it``` method except the ```specify``` method takes the code block as the ```description``` of the test**:
  ```rb
    describe Burger do
      describe "#apply_ketchup" do
        subject { burger }
        before  { burger.apply_ketchup }

        context "with ketchup" do
          let(:burger) { Burger.new(:ketchup => true) }

          specify { subject.has_ketchup_on_it?.should be_true }
        end

        context "without ketchup" do
          let(:burger) { Burger.new(:ketchup => true) }

          specify { subject.has_ketchup_on_it?.should be_false }
        end
      end
    end
  ```
  * One neat thing about ```rspec``` is that **the built in matchers will let you declaratively specify methods in your tests** if they conform to a certain naming convention.
  * RSpec ***will look for methods that are named with ```has``` and end in a question mark to let you do write declarative test code***.
  * Here’s what our final ```Burger``` class will look like using that idiom. Put the following in a file called burger_spec.rb and run it:
  ```rb
    class Burger
      attr_reader :options

      def initialize(options={})
        @options = options
      end

      def apply_ketchup
        @ketchup = @options[:ketchup]
      end

      def has_ketchup_on_it?
        @ketchup
      end
    end


    describe Burger do
      describe "#apply_ketchup" do
        subject { burger }
        before  { burger.apply_ketchup }

        context "with ketchup" do
          let(:burger) { Burger.new(:ketchup => true) }

          it { should have_ketchup_on_it }
        end

        context "without ketchup" do
          let(:burger) { Burger.new(:ketchup => false) }

          it { should_not have_ketchup_on_it }
        end
      end
    end
  ```
