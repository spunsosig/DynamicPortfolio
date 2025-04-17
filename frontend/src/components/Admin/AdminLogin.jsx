const AdminLogin = () => {

    const inputStyle =
    "w-full p-3 mb-6 rounded-xl bg-[#111827] border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none text-white placeholder-gray-400";
  
    const buttonStyle = `w-full bg-purple-600 hover:bg-purple-700 transition rounded-xl font-semibold py-3 text-white`;

  return (
    <div className="admin-login-container flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-white text-5xl pb-10">Admin Login</h1>
      <form className="contact-form">
        <div>
          <input className={inputStyle} placeholder="Username" type="text" id="username" name="username" required />
        </div>
        <div>
          <input className={inputStyle} placeholder="Password" type="password" id="password" name="password" required />
        </div>
        <button className={buttonStyle} type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;