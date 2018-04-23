import React from 'react';
import BubbleStyles from './Bubble.scss';
import ZoeJpg from './images/zoe.jpg';
import CaryJpg from './images/cary.jpg';
import FaithJpg from './images/faith.jpg';
import AshaJpg from './images/asha.jpg';

const Bubble = () => {
    const bubbleObj = [
        {
            img: ZoeJpg,
            name: 'Zoe Gillenwater',
            dateTime: '2010-2-28',
            comments: [
                'Thanks for posting this article. Lots of good info. The only thing I still don\'t really understand is why ' +
                'these blog comments are so plain.Why don\'t you apply some CSS3 and jazz them up?']
        },
        {
            img: CaryJpg,
            name: 'Cary Gillenwater',
            dateTime: '2010-3-1',
            comments: ['I agree with Zoe. Make it cooler looking.']
        },
        {
            img: FaithJpg,
            name: 'Faith Mickley',
            dateTime: '2010-2-28',
            comments: [
                'This is one of my favorite posts so far. Thanks so much for posting it. I agree 100%.',
                'Zoe and Cary, I think the comment area is going to look great by the end of the chapter. Just wait and see!']
        },
        {
            img: AshaJpg,
            name: 'Asha Gillenwater',
            dateTime: '2010-3-10',
            comments: [
                'I really enjoy reading your blog, but what happens when I put a long URL in my comment text,' +
                'like this one:http://forabeautifulweb.com/blog/about/what_does_browser_testing_mean_today/']
        }
    ];

    const setupBubbleContent = bubbleObj.map((item) => (
        <li key={item.name} className={BubbleStyles.comment}>
            <div className={BubbleStyles['comment--meta']}>
                <img src={item.img} width="80" height="80" alt=""/>
                <h4>{item.name}</h4>
                <span>{item.dateTime}</span>
            </div>
            <blockquote>
                {item.comments.map((comment, index) => {
                    const uniqueKey = new Date() + index;
                    return (<p key={uniqueKey}>{comment}</p>);
                })}
            </blockquote>
        </li>
    ));

    return (
        <ol>
            {setupBubbleContent}
        </ol>
    );
};

export default Bubble;
