# ASYNCHRONOUS CODE
By adding an argument (usually named done) to ```it()``` to a test callback, Mocha will know that it should wait for this function to be called to complete the test. This callback accepts both an Error instance (or subclass thereof) or a falsy value; anything else is invalid usage and throws an error (usually causing a failed test).
```javascript
describe('User', function() {
  describe('#save()', function() {
    it('should save without error', function(done) {
      var user = new User('Luna');
      user.save(function(err) {
        if (err) done(err);
        else done();
      });
    });
  });
});
```
Alternatively, use the ```done()``` callback directly (which will handle an error argument, if it exists):
```javascript
describe('User', function() {
  describe('#save()', function() {
    it('should save without error', function(done) {
      var user = new User('Luna');
      user.save(done);
    });
  });
```