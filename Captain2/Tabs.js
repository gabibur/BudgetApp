import React, { Component } from 'react';
import { AppRegistry,
	Text,
	View,
	Form,
	TouchableHighlight,
	ScrollView,
	StyleSheet
} from 'react-native';
import {
	Container,
	Content,
	Button,
	Tabs,
	Header,
	Title
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import DetailExpenses from './DetailExpenses';
import Home from './Home';
import Page1 from './Page1';
import ActionButton from 'react-native-action-button';

class TabsComponent extends Component {
	constructor(props) {
		super(props);
	}
	addExpense() {
		this.props.navigator.push({id:'addExpense'});
	}
	addIncome() {
		this.props.navigator.push({id:'addIncome'});
	}
	render() {
		const styles = StyleSheet.create({
			actionButtonIcon: {
				fontSize: 30,
				height: 30,
				color: 'white',
			}
		});
		return (
			<ScrollView>
				<ActionButton buttonColor="#2BB0FF">
					<ActionButton.Item buttonColor='#C51428' title="Add expense" onPress={this.addExpense.bind(this)}>
						<Icon name="usd" style={styles.actionButtonIcon} />
					</ActionButton.Item>
					<ActionButton.Item buttonColor='#00CF5F' title="Add income" onPress={this.addIncome.bind(this)}>
						<Icon name="usd" style={styles.actionButtonIcon} />
					</ActionButton.Item>
				</ActionButton>
				<View style={{zIndex:-1}}>
					<Container>
						<Content>
							<Tabs initialPage={1}>
								<Page1 tabLabel='Cuenta' navigator={this.props.navigator} />
								<Home tabLabel='Home' navigator={this.props.navigator} />
								<DetailExpenses tabLabel='Fijos' navigator={this.props.navigator} />
							</Tabs>
						</Content>
					</Container>
				</View>
			</ScrollView>
		);
	}
}

module.exports = TabsComponent;
