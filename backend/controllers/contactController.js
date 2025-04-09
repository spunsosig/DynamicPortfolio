const handleContact = (req, res) => {
    const { name, email, message } = req.body;
  
    console.log('Received contact form:', name, email, message);
  
    res.send('OK');
  };
  
  module.exports = { handleContact };