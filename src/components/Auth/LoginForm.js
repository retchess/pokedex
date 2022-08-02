import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Keyboard,
  ToastAndroid,
} from "react-native";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { user, userDetails } from "../../utils/userDB";
import useAuth from "../../hooks/useAuth";

export default function LoginForm() {
  const { login, logout } = useAuth();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (formValue) => {
      const { userName, password } = formValue;
      if (userName !== user.username || password !== user.password) {
        ToastAndroid.show(
          "El usuario o contraseña son incorrectos",
          ToastAndroid.SHORT
        );
      } else {
        login(userDetails);
      }
    },
  });

  return (
    <View>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        placeholder="Nombre de usuario"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        value={formik.values.userName}
        onChangeText={(text) => formik.setFieldValue("userName", text)}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        autoCapitalize="none"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      />
      <Button title="Entrar" onPress={formik.handleSubmit} color="#ff3e3e" />
      <Text style={styles.error}>{formik.errors.userName}</Text>
      <Text style={styles.error}>{formik.errors.password}</Text>
    </View>
  );
}

const initialValues = {
  userName: "",
  password: "",
};

function validationSchema() {
  return {
    userName: Yup.string().required(),
    password: Yup.string().required("La contrasena es obligatoria."),
  };
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    textAlign: "center",
    marginTop: 50,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  error: {
    textAlign: "center",
    color: "#f00",
    marginTop: 20,
  },
});
