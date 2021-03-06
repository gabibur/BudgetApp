import React, {Component} from 'react';
import {
  View,
  Text,
  Navigator,
  TextInput,
  Picker,
  PickerItem,
  Alert,
  ToastAndroid,
  ToolbarAndroid,
  TouchableOpacity,
  StyleSheet,
  Switch
} from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import TextField from 'react-native-md-textinput';
import NavigationBar from 'react-native-navbar';
import { Col, Row, Grid } from "react-native-easy-grid";
import Style from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  FooterTab,
  Footer,
  Badge,
  Container,
  Content,
  Item
} from 'native-base';



class AddIncome extends Component {
  constructor(props) {
    super(props);
    this.addIncome = this.addIncome.bind(this);
    this.goBack = this.goBack.bind(this);
    this.state={amount: 0, name:'', categories: [], categorySelected: {}, monthly: false}
  }


  addIncome(){
    if(this.state.name == ''){
      ToastAndroid.show('Must ingress name', ToastAndroid.SHORT);
    }else if(this.state.amount == 0){
      ToastAndroid.show('Must ingress price', ToastAndroid.SHORT);
    }else{
      var income ={
        name: this.state.name,
        amount: this.state.amount,
        categoryId: this.state.categorySelected._id,
        isIncome: true,
        isMonthly: this.state.monthly
      }

    var userId = '';
    let realm = new Realm({
      schema: [{name: 'User', properties: {name: 'string', id: 'string'}}]
    });
    if(realm.objects('User').length>0){
      userId = realm.objects('User')[0].id;
    } 

      fetch("http://10.0.2.2:3000/"+ userId +"/payment",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(income)

      });
      ToastAndroid.show('Correctly ingressed', ToastAndroid.SHORT);
      this.props.navigator.immediatelyResetRouteStack([{id:'tabs', initialPage:1}]);
    }
  }


  goBack() {
    this.props.navigator.pop();
  }


  componentWillMount() {
    fetch('http://10.0.2.2:3000/categories')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({categories: responseData});
      this.setState({categorySelected: this.state.categories[0], simpleDate: new Date(2020, 4, 5),
      })


    })
    .catch(function(err) {
      console.log('Fetch Error', err);

    });
  }

  render() {
    var leftButtonConfig = {
      title: 'Back',
      handler: this.goBack
    }
    var rightButtonConfig = {
      title: 'Save',
      handler: this.addIncome
    }

    return (
      <Container>
        <Content>
          <NavigationBar
            title={{title:'Add expense'}}
            leftButton={leftButtonConfig}
            rightButton={rightButtonConfig}
          />
          <Grid style={{padding:10}}>
            <Row>
              <TextInput autoFocus={true} style={{width:Style.DEVICE_WIDTH, fontSize:20}}  placeholder='Title' highlightColor={'#00BCD4'} onChangeText={(text) => this.setState({name: text})} />
            </Row>

            <Row style={{alignItems: 'center'}}>
              <Col size={1}>
                <Text style={{fontSize:30, marginVertical:10}}>$</Text>
              </Col>
              <Col size={5}>
                <TextInput style={{width:(Style.DEVICE_WIDTH/5), fontSize:20, height:50}} keyboardType='phone-pad' placeholder='Price' highlightColor={'#00BCD4'} onChangeText={(num) => this.setState({amount: num})} />
              </Col>
              <Col size={12}>
                <Picker
                  mode='dropdown'
                  selectedValue={this.state.categorySelected}
                  onValueChange={(cat) => this.setState({categorySelected: cat})}>
                  { this.state.categories.map((s,i) => {
                    return <Picker.Item
                      key = {i}
                      value={s}
                      label={s.name} />
                    }) }
                  </Picker>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Text style={{fontSize:15}}>Monthly income</Text>
                </Col>
                <Col>
                  <Switch
                    onValueChange={(value) => this.setState({monthly: value})}
                    onTintColor="#00ff00"
                    thumbTintColor="#0000ff"
                    tintColor="#ff0000"
                    style={{marginBottom: 10}}
                    value={this.state.monthly} />

                  </Col>
                </Row>
              </Grid>
            </Content>
          </Container>
        )
      }


    }


    module.exports = AddIncome;
