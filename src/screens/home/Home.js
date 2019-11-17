import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { auth } from '../../store/action/action'
import { Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Container from '../../container/Container';
import Image from 'react-native-remote-svg';
import Icons from '../../svgIcons/HeaderIcon'
import GridView from '../../components/gridView/GridView';
import ListView from '../../components/listView/ListView';


class Home extends Component {
    constructor() {
        super()

        this.state = {
            list: false,
            listItems: [
                {
                    name: 'Airtime',
                    width: 17,
                    height: 23,
                    iconName: 'airtime'
                },
                {
                    name: 'Business Referal',
                    width: 26,
                    height: 22,
                    iconName: 'referal'
                }
            ]
        }
    }

    componentWillMount() {
    }

    componentWillReceiveProps(props) {

    }

    selector() {
        const { list } = this.state
        return (
            <View style={{ borderRadius: 50, flexDirection: 'row' }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.setState({ list: true })} style={[{
                    paddingHorizontal: '6%',
                    paddingVertical: '5%',
                    alignSelf: 'center',
                    borderTopLeftRadius: 50,
                    borderBottomLeftRadius: 50,
                    flexDirection: 'row',
                    backgroundColor: list ? '#ce3b33' : null,
                    alignItems: 'center',
                }, !list ? styles.shadow : null]}>
                    <View style={{ paddingRight: '8%' }}>
                        {
                            list ?
                                <Image
                                    source={Icons.listColor}
                                    style={{ width: 14, height: 14 }}
                                />
                                :
                                <Image
                                    source={Icons.listView}
                                    style={{ width: 14, height: 14 }}
                                />
                        }
                    </View>
                    <View>
                        <Text style={{ fontSize: 13, color: list ? '#ffffff' : '#24253d' }}>
                            {'List View'}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.setState({ list: false })} style={[{
                    paddingHorizontal: '6%',
                    flexDirection: 'row',
                    backgroundColor: !list ? '#ce3b33' : null,
                    alignItems: 'center',
                    borderTopRightRadius: 50,
                    borderBottomRightRadius: 50,
                }, list ? styles.shadow : null]}>
                    <View style={{ paddingRight: '8%' }}>
                        {
                            list ?
                                <Image
                                    source={Icons.gridView}
                                    style={{ width: 14, height: 14 }}
                                />
                                :
                                <Image
                                    source={Icons.gridColor}
                                    style={{ width: 14, height: 14 }}
                                />
                        }
                    </View>
                    <View>
                        <Text style={{ fontSize: 13, color: list ? '#24253d' : '#ffffff' }}>
                            {'Grid View'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { listItems, list } = this.state
        return (
            <Container>
                <View style={styles.listView}>
                    {
                        this.selector()
                    }
                </View>
                <View style={styles.list}>
                    <ScrollView showsVerticalScrollIndicator={false} style={!list ? { width: '100%', borderTopColor: '#f2f2f2', borderTopWidth: 1 } : { width: '100%' }}>
                        {
                            list ?
                                listItems &&
                                listItems.map((items, index) => {
                                    return (
                                        <ListView key={index} iconName={items.iconName} title={items.name} width={items.width} height={items.height} />
                                    )
                                })
                                :
                                <GridView />
                        }
                    </ScrollView>
                </View>
            </Container >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    listView: {
        alignItems: 'center',
        paddingVertical: '5%',
    },
    shadow: {
        shadowColor: 'rgba(227, 227, 227, 0.5)',
        shadowOffset: { width: 10, height: 12 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    list: {
        flex: 1,
        alignItems: 'center'
    }
});



function mapStateToProps(state) {
    return ({
        name: state.authreducer.TEST,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            auth
        }, dispatch)
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);

