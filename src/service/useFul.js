export const validate = (type, value) => {
    switch (type) {
      case "name":
        if (value.length < 2) {
          return "!el nombre es demasiado corto";
        } else {
          return "";
        }
      case "last_name":
        if (value.length < 4) {
          return "!el/los apellido/s demasiado corto";
        } else {
          return "";
        }
      case "nickname":
        if (value.length < 4) {
          return "!minimo 4 caracteres";
        } else {
          return "";
        }
      case "phone":
        if (!/^\d{9}$/g.test(value)) {
          return "!formato incorecto!";
        } else {
          return "";
        }
      case "date":
        if (value > new Date().getFullYear()) {
          return "!no puedes haber nacido en futuro. ¿O SI?!";
        } else if (value < new Date().getFullYear() - 120) {
          return `!unpoco viejo para hacerse tatuajes con ${
            new Date().getFullYear() - value
          } años !!!!`;
        } else {
          return "";
        }
      case "email":
        if (value.length < 8) {
          return "!campo email vacio!";
        } else {
          if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,48}$/g.test(value)
          ) {
            return "!formato incorecto!";
          } else {
            return "";
          }
        }
      case "password":
        if (value.length < 1) {
          return "!campo contraseña vacio!";
        } else {
          if (/^(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+\\|[\]{};:'",.<>/?])(?=.*\d)(?!.*[\s])[\w!@#$%^&*()-_=+\\|[\]{};:'",.<>/?]{8,20}$/g.test(value)) {
            return "La contraseña debe contener al menos una letra mayúscula, un carácter especial y tener una longitud de 6 a 15 caracteres. No debe contener dígitos, paréntesis ni signos de suma/resta.";
          } else {
            return "";
          }
        }
    }
  };
  