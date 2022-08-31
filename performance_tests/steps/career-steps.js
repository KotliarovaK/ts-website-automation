import http from 'k6/http';
import { parseHTML } from 'k6/html';
import jsonpath from "https://jslib.k6.io/jsonpath/1.0.2/index.js";
import { URL_PROVIDER } from '../providers/url-provider.js';

export function getBuildId(){
    const response = http.get(URL_PROVIDER.webApp);
    const doc = parseHTML(response.body);
    const nextDataJson = doc.find('body script#__NEXT_DATA__').text();
    const buildId = jsonpath.value(JSON.parse(nextDataJson), 'buildId');
    return buildId;
}

export function getToWebsite(){
    http.get(URL_PROVIDER.webApp);
}

export function getToCareer(carrer, BUILD_ID){
    const url = URL_PROVIDER.webApp + '/_next/data/' + BUILD_ID + '/en-US/' + carrer + '.json';
    http.get(url);
};

// navaiget back from career page
export function getBack(BUILD_ID){
    const url = URL_PROVIDER.webApp + '/_next/data/' + BUILD_ID + '/en-US.json';
    http.get(url);
};

export function getToContactUs(BUILD_ID){
    const url = URL_PROVIDER.webApp + '/_next/data/' + BUILD_ID + '/en-US/contact-us.json';
    http.get(url);
};

export function getToAboutUs(BUILD_ID){
    const url = URL_PROVIDER.webApp + '/_next/data/' + BUILD_ID + '/en-US/about-us.json';
    http.get(url);
};

export function getToReviews(BUILD_ID){
    const url = URL_PROVIDER.webApp + '/_next/data/' + BUILD_ID + '/en-US/reviews.json';
    http.get(url);
};