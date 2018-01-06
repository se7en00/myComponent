import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames/bind';
import {Accordion, AccordionItem, AccordionTitle, AccordionContent} from 'components/accordion';
import style from './demo.scss';

class AccordionDemo extends Component {
    render() {
        return (
            <Accordion>
                <AccordionItem>
                    <AccordionTitle>
                        <h3>
                            Accessible Accordion
                        </h3>
                    </AccordionTitle>
                    <AccordionContent>
                        <p>
                            Everything mentioned in the installation process should already be done.
                        </p>
                        <p>
                            # Make sure you use the right node version.<br/>
                            nvm use<br/>
                            # Start the server and the development tools.<br/>
                            npm run start-demo
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem>
                    <AccordionTitle className={style.multiplyTitle}>
                        <span className={style.multiplyTitle__label}>
                            <i className="fa fa-question-circle"/>
                            <h3>
                            Components
                            </h3>
                        </span>
                        <div className={style.multiplyTitle__description}>
                            See all the components from this package</div>
                    </AccordionTitle>
                    <AccordionContent>
                        <ul>
                            <li>Accordion</li>
                            <li>AccordionItem</li>
                            <li>AccordionItemTitle</li>
                            <li>AccordionItemBody</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem>
                    <AccordionTitle hideDownIcon={true}>
                        <h3>
                            Accessible Accordion
                        </h3>
                    </AccordionTitle>
                    <AccordionContent>
                        <p>
                            Everything mentioned in the installation process should already be done.
                        </p>
                        <p>
                            # Make sure you use the right node version.<br/>
                            nvm use<br/>
                            # Start the server and the development tools.<br/>
                            npm run start-demo
                        </p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        );
    }
}
AccordionDemo.propTypes = {};
AccordionDemo.defaultProps = {};

export default AccordionDemo;
