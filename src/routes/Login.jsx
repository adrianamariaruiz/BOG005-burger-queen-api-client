import logo from "../resources/logo-bq.png";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import loginUser from "../helpers/axios";
import { useState } from "react";

const Login = () => {
  const navegate = useNavigate();
  const { handleSubmit } = useForm();
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChangeEmail = (e) => {
    const text = e.target.value;
    setInputEmail(text);
  };

  const handleInputChangePassword = (e) => {
    const text = e.target.value;
    setInputPassword(text);
  };

  const validateUser = () => {
    setLoading(true);
    loginUser(inputEmail, inputPassword)
      .then((res) => {
        if (res.data.user.role === "admin") {
          navegate("/admin");
        } else if (res.data.user.role === "waiter") {
          navegate("/order");
        } else if (res.data.user.role === "chef") {
          navegate("/orderStateChef");
        }
      })
      .catch((error) => {
        if (error.response.data === "Email and password are required") {
          setErrorLogin("Ingresa email y contraseña ");
        } else if (error.response.data === "Cannot find user") {
          setErrorLogin("Usuario no encontrado");
        } else if (error.response.data === "Email format is invalid") {
          setErrorLogin("Intruduce email valido");
        } else if (error.response.data === "Incorrect password") {
          setErrorLogin("Contraseña invalida");
        } else if (error.response.data === "Password is too short") {
          setErrorLogin("Introduce contraseña valida");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {loading ? (
        <div className="loading">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="stick__container">
            <div className="stick__login--container">
              <div className="stick__login--credentials">
                <p>Prueba con el perfil de mesero:</p>
                <p>Usuario: diana.trujillo@systers.xyz</p>
                <p>Contraseña: 123456</p>
              </div>
            </div>
          </div>
          <form
            typeof="submit"
            className="formLogin"
            autoComplete="on"
            onSubmit={handleSubmit(validateUser)}
          >
            <FormInput
              type="email"
              onChange={handleInputChangeEmail}
              required
              placeholder="Ingresa tu Email"
              className="emailInput"
              name="emailLogin"
              label="Email"
              data-testid="login-email-input"
            ></FormInput>
            <FormInput
              className="passwordInput"
              type="password"
              onChange={handleInputChangePassword}
              required
              placeholder="Ingresa tu contraseña"
              name="passwordLogin"
              label="Contraseña"
              data-testid="login-password-input"
            ></FormInput>
            <Button text="Ingresar" className="btn btnStyleLogin"></Button>
            <p>{errorLogin}</p>
          </form>
        </>
      )}
    </section>
  );
};

export default Login;
