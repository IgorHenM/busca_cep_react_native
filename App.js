import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { getCepInformation } from './services/cep-service';
import * as Animatable from 'react-native-animatable';

export default function App() {
  var [cep, setCep] = useState('');
  var [hasInfos, setHasInfos] = useState(false);
  var [showOverflow, setShowOverflow] = useState(false);//inverter
  var [showErrorModal, setShowErrorModal] = useState(false);//inverter
  var [errorDescription, setErrorDescription] = useState('Erro na busca das informações');
  var [showLoading, setShowLoading] = useState(false);
  var [infos, setInfos] = useState({});

  const imageLoading = require('./assets/loading-svgrepo-com.png');

  async function searchCep() {
    setHasInfos(false);

    const formattedCep = cep.replace('-', '');
    let infos = null;

    if (formattedCep.length < 8) {
      toogleErrorModal('O CEP deve possuir 8 números ou atender ao seguinte formato: 00000-000');
      return;
    }

    try {
      openLoading();
      infos = await getCepInformation(formattedCep);
      closeLoading();
    } catch (e) {
      toogleErrorModal('Serviço de busca indisponivel.')
    }

    if (infos.data) {
      if (infos.data.erro) {
        toogleErrorModal('Erro na consulta, CEP inválido ou serviço indisponivel.');
        return;
      }
  
      const {cep, logradouro, complemento, bairro, localidade, uf, estado, regiao, ddd} = infos.data;
  
      setInfos({
        cep: cep,
        logradouro: logradouro,
        complemento: complemento,
        bairro: bairro,
        localidade: localidade,
        uf: uf,
        estado: estado,
        regiao: regiao,
        ddd: ddd
      });
  
      setHasInfos(true);
      
    }
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

  function openLoading() {
    setShowOverflow(true);
    setShowLoading(true);
  }

  function closeLoading() {
    setShowOverflow(false);
    setShowLoading(false);
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
        {showLoading && (<View style={styles.loading_panel}>
          <Animatable.Image
            animation='rotate'
            duration={1000}
            iterationCount='infinite'
            useNativeDriver={true}
            source={imageLoading}
            resizeMode='contain'
            style={styles.icon_loading}
          />
          <Text style={styles.loading_label}>Carregando...</Text>
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
        <Pressable style={styles.btn_style} onPress={searchCep}>
          <Text style={styles.text}>Buscar</Text>
        </Pressable>
      </View>
      {hasInfos && (<View style={styles.infos}>
        <View style={styles.content_info}>
          <Text style={styles.desc_info}>CEP:</Text>
          <Text style={styles.info_value}>{infos.cep}</Text>
        </View>
        <View style={styles.content_info}>
          <Text style={styles.desc_info}>LOGRADOURO:</Text>
          <Text style={styles.info_value}>{infos.logradouro}</Text>
        </View>
        <View style={styles.content_info}>
          <Text style={styles.desc_info}>COMPLEMENTO:</Text>
          <Text style={styles.info_value}>{infos.complemento}</Text>
        </View>
        <View style={styles.content_info}>
          <Text style={styles.desc_info}>BAIRRO:</Text>
          <Text style={styles.info_value}>{infos.bairro}</Text>
        </View>
        <View style={styles.content_info}>
          <Text style={styles.desc_info}>LOCALIDADE:</Text>
          <Text style={styles.info_value}>{infos.localidade}</Text>
        </View>
        <View style={styles.content_info}>
          <Text style={styles.desc_info}>UF:</Text>
          <Text style={styles.info_value}>{infos.uf}</Text>
        </View>
        <View style={styles.content_info}>
          <Text style={styles.desc_info}>ESTADO:</Text>
          <Text style={styles.info_value}>{infos.estado}</Text>
        </View>
        <View style={styles.content_info}>
          <Text style={styles.desc_info}>REGIÃO:</Text>
          <Text style={styles.info_value}>{infos.regiao}</Text>
        </View>
        <View style={styles.content_info}>
          <Text style={styles.desc_info}>DDD:</Text>
          <Text style={styles.info_value}>{infos.ddd}</Text>
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
    borderRadius: 5,
    padding: 10
  },
  content_info: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  error_modal: {
    width: '90%',
    height: '17%',
    backgroundColor: '#ffffff',
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
  },
  icon_loading: {
    width: 40,
    height: 40,
    filter: 'invert(100%)'
  },
  loading_panel: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading_label: {
    color: '#ffffff',
    marginTop: 10
  }
});
