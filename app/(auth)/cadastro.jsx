import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Cadastro() {
  const { register } = useAuth();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const podeSubmeter =
    nome.trim().length > 0 &&
    EMAIL_REGEX.test(email) &&
    senha.length >= 6 &&
    senha === confirmar;

  function validate() {
    const errs = {};
    if (!nome.trim()) errs.nome = 'O nome é obrigatório';
    if (!email.trim()) errs.email = 'O e-mail é obrigatório';
    else if (!EMAIL_REGEX.test(email)) errs.email = 'Digite um e-mail válido (ex: nome@email.com)';
    if (!senha) errs.senha = 'A senha é obrigatória';
    else if (senha.length < 6) errs.senha = 'A senha deve ter no mínimo 6 caracteres';
    if (senha && senha !== confirmar) errs.confirmar = 'As senhas não coincidem';
    return errs;
  }

  async function handleCadastro() {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setErrors({});
    try {
      await register(nome.trim(), email.trim().toLowerCase(), senha);
    } catch (e) {
      setErrors({ geral: e.message });
    } finally {
      setLoading(false);
    }
  }

  function clearError(field) {
    setErrors((e) => ({ ...e, [field]: undefined, geral: undefined }));
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Criar conta</Text>
      <Text style={styles.subtitulo}>Preencha os dados para se cadastrar</Text>

      <View style={styles.campo}>
        <TextInput
          style={[styles.input, errors.nome && styles.inputErro]}
          placeholder="Nome"
          placeholderTextColor="#666"
          value={nome}
          onChangeText={(v) => { setNome(v); clearError('nome'); }}
        />
        {errors.nome && <Text style={styles.erro}>{errors.nome}</Text>}
      </View>

      <View style={styles.campo}>
        <TextInput
          style={[styles.input, errors.email && styles.inputErro]}
          placeholder="Email"
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(v) => { setEmail(v); clearError('email'); }}
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
          onChangeText={(v) => { setSenha(v); clearError('senha'); }}
        />
        {errors.senha && <Text style={styles.erro}>{errors.senha}</Text>}
      </View>

      <View style={styles.campo}>
        <TextInput
          style={[styles.input, errors.confirmar && styles.inputErro]}
          placeholder="Confirmar senha"
          placeholderTextColor="#666"
          secureTextEntry
          value={confirmar}
          onChangeText={(v) => { setConfirmar(v); clearError('confirmar'); }}
        />
        {errors.confirmar && <Text style={styles.erro}>{errors.confirmar}</Text>}
      </View>

      {errors.geral && <Text style={styles.erroGeral}>{errors.geral}</Text>}

      <TouchableOpacity
        style={[styles.botao, !podeSubmeter && styles.botaoDesabilitado]}
        onPress={handleCadastro}
        disabled={!podeSubmeter || loading}
      >
        <Text style={styles.botaoTexto}>{loading ? 'Cadastrando...' : 'Cadastrar'}</Text>
      </TouchableOpacity>

      <Link href="/(auth)/login" style={styles.link}>
        Já tem conta? <Text style={styles.linkDestaque}>Entrar</Text>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#0F1115',
  },
  container: {
    padding: 24,
    justifyContent: 'center',
    flexGrow: 1,
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
