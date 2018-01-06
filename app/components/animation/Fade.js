import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Transition } from 'react-transition-group';

const Fade = (props) => {
    const {children, inProp, duration, cssStyle} = props;
    const cx = classNames.bind(cssStyle);
    return (
        <Transition
            in={inProp}
            timeout={{
                enter: 0,
                exit: duration
            }}>
            {
                (state) => {
                    if (state === 'exited') {
                        return null;
                    }

                    const classes = cx({
                        subMenu: true,
                        [`subMenu--${state}`]: true
                    });
                    return React.cloneElement(children, {className: classes});
                }
            }
        </Transition>
    );
};

Fade.propTypes = {
    children: PropTypes.node,
    inProp: PropTypes.bool.isRequired,
    duration: PropTypes.number.isRequired,
    cssStyle: PropTypes.object
};

Fade.defaultProps = {
    children: null,
    cssStyle: null
};

export default Fade;
