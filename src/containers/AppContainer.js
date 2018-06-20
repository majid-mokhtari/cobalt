import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/form';
import ParseForm from '../components/parse/ParseForm'
import ParseTable from '../components/parse/ParseTable'
import ContainsForm from '../components/contains'
import * as types from '../constants/types'
import { Tabs, Col, Row } from 'antd'

const TabPane = Tabs.TabPane;

class AppContainer extends Component {
    
    renderContent(){
      const { data, type } = this.props.form;
      if(type === types.CONTAINS_DATA_LOADED){
        if(data.exists){
          return (<span>Text exists</span>)
        } else {
          return (<span>Text does not exist</span>)
        }
        
      }
      return (
        <ParseTable 
          data={data}
          {...this.props}
        />
      )
    }
    render() {
        const content = this.renderContent()
        return (
          <Row className="app" >
            <Col span={7} >
              <Tabs defaultActiveKey="parse" >
                <TabPane tab="Parse" key="parse">
                  <ParseForm 
                    submitForm={(values) => this.props.actions.parse(values)}
                  />
                </TabPane>
                <TabPane tab="Contain" key="contain">
                  <ContainsForm 
                    submitForm={(values) => this.props.actions.contains(values)}
                  />
                </TabPane>
              </Tabs>
            </Col>
            <Col span={15} offset={2}>
                {content}
            </Col>
          </Row>
        );
    }
}


function mapStateToProps({form} ) {
  return {form};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);