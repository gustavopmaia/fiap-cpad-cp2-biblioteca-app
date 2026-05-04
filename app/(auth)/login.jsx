import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const podeSubmeter = emailValido && senha.length >= 6;

  function validate() {
    const errs = {};
    if (!emailValido) errs.email = 'Email inválido';
    if (senha.length < 6) errs.senha = 'Senha deve ter no mínimo 6 caracteres';
    return errs;
  }

  async function handleLogin() {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setErrors({});
    try {
      await login(email.trim().toLowerCase(), senha);
    } catch (e) {
      setErrors({ geral: e.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Biblioteca</Text>
      <Text style={styles.subtitulo}>Faça login para continuar</Text>

      <View style={styles.campo}>
        <TextInput
          style={[styles.input, errors.email && styles.inputErro]}
          placeholder="Email"
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(v) => { setEmail(v); setErrors((e) => ({ ...e, email: undefined, geral: undefined })); }}
        />
        {errors.email && <Text style={styles.erro}>{errors.email}</Text>}
      </View>

      <View style={styles.campo}>
        <TextInput
          style={[styles.input, errors.senha && styles.inputErro]}
          placeholder="Senha"
          placeholderTextColor="#666"
          secureTextEntry
          value={senha}
          onChangeText={(v) => { setSenha(v); setErrors((e) => ({ ...e, senha: undefined, geral: undefined })); }}
        />
        {errors.senha && <Text style={styles.erro}>{errors.senha}</Text>}
      </View>

      {errors.geral && <Text style={styles.erroGeral}>{errors.geral}</Text>}

      <TouchableOpacity
        style={[styles.botao, !podeSubmeter && styles.botaoDesabilitado]}
        onPress={handleLogin}
        disabled={!podeSubmeter || loading}
      >
        <Text style={styles.botaoTexto}>{loading ? 'Entrando...' : 'Entrar'}</Text>
      </TouchableOpacity>

      <Link href="/(auth)/cadastro" style={styles.link}>
        Não tem conta? <Text style={styles.linkDestaque}>Cadastre-se</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1115',
    padding: 24,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 32,
    fontWeight: '700',
    color: '#E83D84',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#AAA',
    textAlign: 'center',
    marginBottom: 32,
  },
  campo: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#1C1F26',
    color: '#FFF',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#2A2D35',
  },
  inputErro: {
    borderColor: '#E83D84',
  },
  erro: {
    color: '#E83D84',
    fontSize: 13,
    marginTop: 4,
  },
  erroGeral: {
    color: '#E83D84',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
  },
  botao: {
    backgroundColor: '#E83D84',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoDesabilitado: {
    opacity: 0.4,
  },
  botaoTexto: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  link: {
    color: '#AAA',
    textAlign: 'center',
    marginTop: 24,
    fontSize: 14,
  },
  linkDestaque: {
    color: '#E83D84',
    fontWeight: '600',
  },
});
