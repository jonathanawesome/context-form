import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { withContextFormInstanceConsumer } from '../Context/ContextFormInstanceContext';
import FieldArrayContext from '../Context/FieldArrayContext';
import FieldArrayAdd from './FieldArrayAdd';
import FieldArrayRemove from './FieldArrayRemove';
import FieldArrayIndex from './FieldArrayIndex';

class FieldArray extends Component {

  constructor(props) {
    super(props);
    props.form.registerFieldArray(props.name, this, { initialCount : props.initialCount });
  }

  getFieldValues = () => this.props.form?.getValue(this.props.name) || [];
  setFieldValues = values => this.props.form?.setValue(this.props.name, values);

  setValue = (name, value, index) => {
    let values = this.getFieldValues();
    if (!values[index]) {
      values[index] = {};
    }
    values[index][name] = value;
    this.setFieldValues(values);
  };

  getValue = (name, index) => {
    const groupValue = this.getFieldValues()[index];
    return groupValue ? groupValue[name] : undefined;
  };

  removeGroup = (index) => {
    const values = this.getFieldValues();
    this.setFieldValues([...values.slice(0, index), ...values.slice(index + 1)]);
  };

  addGroup = () => {
    this.setFieldValues([
      ...this.getFieldValues(),
      {},
    ]);
  };

  componentDidUpdate = (props) => {
    if (this.props.initialCount !== props.initialCount) {
      let values = this.getFieldValues();
      if (values.length < this.props.initialCount) {
        while (values.length < this.props.initialCount) {
          values.push({});
        }
        this.setFieldValues(values);
      }
    }
  };

  render() {
    const values                                                  = this.getFieldValues();
    const { initialCount, minCount, style, className, component } = this.props;

    const items            = Array.from({ length : values.length }, (v, k) => k);
    let extraProps         = {};
    let ContainerComponent = Fragment;
    if (style || className) {
      extraProps         = { style, className };
      ContainerComponent = component;
    }

    return (
      <ContainerComponent {...extraProps}>
        {items.map(index => (
          <FieldArrayContext.Provider key={index} value={{
            getValue       : (name, currentIndex = index) => this.getValue(name, currentIndex),
            setValue       : (name, value, currentIndex = index) => this.setValue(name, value, currentIndex),
            hasError       : (name, currentIndex = index) => {
              return this.props.form?.hasError([this.props.name, currentIndex, name].join('.'));
            },
            getErrors      : (name, currentIndex = index) => {
              return this.props.form?.getErrors([this.props.name, currentIndex, name].join('.'));
            },
            removeGroup    : this.removeGroup,
            count          : values.length,
            getId          : () => this.props.form?.getName() + '-' + this.props.name,
            getName        : () => this.props.name,
            getIndexedName : () => this.props.name + '.' + index,
            minCount,
            initialCount,
            index,
          }}>
            {this.props.children}
          </FieldArrayContext.Provider>
        ))}
      </ContainerComponent>
    );
  }
}

FieldArray.propTypes = {
  name         : PropTypes.string.isRequired,
  initialCount : PropTypes.number.isRequired,
  minCount     : PropTypes.number,
};

FieldArray.defaultProps = {
  initialCount : 1,
  minCount     : 0,
  component    : 'div',
};

FieldArray.Add    = FieldArrayAdd;
FieldArray.Remove = FieldArrayRemove;
FieldArray.Index  = FieldArrayIndex;

FieldArray = withContextFormInstanceConsumer(FieldArray);

export default FieldArray;
