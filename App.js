import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { getCepInformation } from './services/cep-service';

export default function App() {
  var [cep, setCep] = useState('');
  var [hasInfos, setHasInfos] = useState(null);
  var [showOverflow, setShowOverflow] = useState(true);//inverter
  var [showErrorModal, setShowErrorModal] = useState(false);//inverter
  var [errorDescription, setErrorDescription] = useState('Erro na busca das informações');
  var [showLoading, setShowLoading] = useState(true);

  async function searchCep() {

  }

  function toogleErrorModal(description) {
    const toogleModal = showErrorModal ? false : true;
    const toogleOverflow = showOverflow ? false : true;

    if (description) {
      setErrorDescription(description);
    }

    setShowOverflow(toogleOverflow);
    setShowErrorModal(toogleModal);

  }

  return (
    <View style={styles.container}>
      {showOverflow && (<View style={styles.overflow}>
        {showErrorModal && (<View style={styles.error_modal}>
          <View style={styles.error_header}>
            <Text style={styles.error_icon}>!</Text>
            <Text>Erro</Text>
          </View>
          <View style={styles.error_context}>
            <Text>{errorDescription}</Text>
          </View>
          <View style={styles.error_buttons}>
            <Pressable style={styles.btn_close_error_modal} onPress={toogleErrorModal}>
              <Text>Fechar</Text>
            </Pressable>
          </View>
        </View>)}
        {showLoading && (<View>
          <Image
            source={require('./assets/loading-svgrepo-com.svg')}
            resizeMode='contain'
          />
        </View>)}
      </View>)}
      <Text style={styles.title}>Busque informações de um CEP</Text>
      <View style={styles.sub_container}>
        <TextInput
        placeholder='Digite o CEP'
          keyboardType='default'
          onChangeText={setCep}
          value={cep}
          style={styles.input_cep}
        />
        <Pressable style={styles.btn_style}>
          <Text style={styles.text}>Buscar</Text>
        </Pressable>
      </View>
      {hasInfos !== null && (<View style={styles.infos}>
        <View style={styles.content_info}>
          <Text style={styles.desc_info}>CEP:</Text>
          <Text style={styles.info_value}>88122-250</Text>
        </View>
        <View style={styles.content_info}>
          <Text style={styles.desc_info}>LOGRADOURO:</Text>
          <Text style={styles.info_value}>88122-250</Text>
        </View>
        <View style={styles.content_info}>
          <Text style={styles.desc_info}>COMPLEMENTO:</Text>
          <Text style={styles.info_value}>88122-250</Text>
        </View>
        <View style={styles.content_info}>
          <Text style={styles.desc_info}>BAIRRO:</Text>
          <Text style={styles.info_value}>88122-250</Text>
        </View>
        <View style={styles.content_info}>
          <Text style={styles.desc_info}>LOCALIDADE:</Text>
          <Text style={styles.info_value}>88122-250</Text>
        </View>
        <View style={styles.content_info}>
          <Text style={styles.desc_info}>UF:</Text>
          <Text style={styles.info_value}>88122-250</Text>
        </View>
        <View style={styles.content_info}>
          <Text style={styles.desc_info}>ESTADO:</Text>
          <Text style={styles.info_value}>88122-250</Text>
        </View>
        <View style={styles.content_info}>
          <Text style={styles.desc_info}>REGIÃO:</Text>
          <Text style={styles.info_value}>88122-250</Text>
        </View>
        <View style={styles.content_info}>
          <Text style={styles.desc_info}>DDD:</Text>
          <Text style={styles.info_value}>88122-250</Text>
        </View>
      </View>)}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    top: '5%'
  },
  title: {
    color: 'rgb(0,0,109)',
    fontWeight: '700',
    fontFamily: 'Roboto',
    fontSize: 20
  },
  input_cep: {
    borderWidth: 1,
    borderColor: '#00000',
    width: '60%',
    height: 40,
    borderRadius: 5
  },
  sub_container: {
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    flexWrap: 'wrap'
  },
  btn_style: {
    height: 40,
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(0,0,109)',
    borderRadius: 5,
    marginLeft: 5,
    width: '20%'
  },
  text: {
    color: '#ffffff'
  },
  map_view: {
    width: '90%',
    height: '60%',
    flex: 1
  },
  infos: {
    backgroundColor: '#d9d9d9',
    width: '90%',
    marginTop: '15%',
    borderRadius: 5
  },
  content_info: {
    display: 'flex',
    flexDirection: 'row'
  },
  desc_info: {
    fontWeight: 'bold',
    fontSize: 17
  },
  info_value: {
    marginLeft: '2%',
    fontSize: 17
  },
  overflow: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 100,
    backgroundColor: '#00000060',
  },
  error_modal: {
    width: '90%',
    height: '17%',
    backgroundColor: '#ffffff',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
    borderRadius: 5
  },
  error_header: {
    width: '100%',
    borderBottomColor: 'rgb(0,0,109)',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  error_icon: {
    fontWeight: 'bold',
    color: 'rgb(0,0,109)',
    backgroundColor: '#fff',
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'rgb(0,0,109)',
    textAlign: 'center',
    borderRadius: 100,
    margin: 2
  },
  error_context: {
    height: '65%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  error_buttons: {
    alignItems: 'flex-end'
  },
  btn_close_error_modal: {
    marginRight: 5,
    backgroundColor: '#d9d9d9',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 5
  }
});
