import React, { Component, useEffect, useState } from "react";
import Faq from "react-faq-component";

const data = {
    title: "FAQ",
    rows: [
        {
            title: "Who can use PHMS?",
            content: `Every person having Aadhaar Id can use the services by registering on the PHMS portal.`,
        },
        {
            title: "Is my Data safe?",
            content:
                "We do not share ypur data with anyone for advertising, analysis etc. You data will be accessible to Doctors(for treatment) and Admins(for analysis)",
        },
        {
            title: "Can I book online appointments?",
            content: `Yes. You can book online appointments here on PHMS portal.`,
        },
        {
            title: "As a pharmacy or hospital operator, how often should I update my Data?",
            content: `It is adviced to update your data as you update your inventory for optimal portal functioning.`,
        },
        {
            title: "Why does a doctor have access to my Data?",
            content: `The doctor needs to know the previous patient history for better treatment. Thus the doctors can chek previous data.`,
        },
        {
            title: "Can I rely on PHMS?",
            content: `Yes, you can definitely rely on PHMS. But in case of emergency and sever illness, visit your doctor immediately.`,
        },
        {
            title: "Who is responsible for delay in PHMS?",
            content: `We understand that delay in medical process is not tolerable. But due to various reasons like internet connectivity, improper filling of data, there may be delay in the process of appointments. The PHMS, however is not responsible for the loss and users are adviced to decide on their own discretion`,
        },
    ],
};

const styles = {
    // bgColor: 'white',
    titleTextColor: "Red",
    rowTitleColor: "DarkBlue",
    rowContentColor: 'Charcoal',
    arrowColor: "red",
};

const config = {
    animate: true,
    // arrowIcon: "V",
    tabFocus: true
};


export default class FaqPage extends Component{
    render() {
        return (
            <div>
            <Faq
                data={data}
                styles={styles}
                config={config}
            />
            </div>
        )
    }
}