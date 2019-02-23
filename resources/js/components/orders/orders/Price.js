import React from 'react'
import NumberFormat from 'react-number-format'
import {Layout, Card} from 'element-react'
import translate from '../../../helpers/translate'

const Price = (props) => {
  return (
    <div className='wrapper-md'>
      <Layout.Row gutter="20">
        <Layout.Col span="5">
          <Card className="widget widget-default">
            <div className="widget-heading clearfix">
              <div className="pull-left">{translate.get('Shipping Price')}</div>
            </div>
            <div className="widget-body clearfix">
              <div className="pull-left">{props.devise}</div>
              <div className="pull-right number">
                <NumberFormat
                  className="form-control"
                  value={props.shippingPrice}
                  thousandSeparator={true}
                  displayType='text'
                  renderText={value => <span>{value}</span>}
                />
              </div>
            </div>
          </Card>
        </Layout.Col>
        <Layout.Col span="5">
          <Card className="widget widget-default">
            <div className="widget-heading clearfix">
              <div className="pull-left">{translate.get('Order Price')}</div>
            </div>
            <div className="widget-body clearfix">
              <div className="pull-left">{props.devise}</div>
              <div className="pull-right number">
                <NumberFormat
                  className="form-control"
                  value={props.orderPrice}
                  thousandSeparator={true}
                  displayType='text'
                  renderText={value => <span>{value}</span>}
                />
              </div>
            </div>
          </Card>
        </Layout.Col>
        <Layout.Col span="5">
          <Card className="widget widget-default">
            <div className="widget-heading clearfix">
              <div className="pull-left">{translate.get('Total Price')}</div>
            </div>
            <div className="widget-body clearfix">
              <div className="pull-left">{props.devise}</div>
              <div className="pull-right number">
                <NumberFormat
                  className="form-control"
                  value={props.totalPrice}
                  thousandSeparator={true}
                  displayType='text'
                  renderText={value => <span>{value}</span>}
                />
              </div>
            </div>
          </Card>
        </Layout.Col>
      </Layout.Row>
    </div>
  )
}

export default Price
