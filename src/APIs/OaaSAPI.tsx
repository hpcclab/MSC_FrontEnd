import React from 'react';

import axios, { AxiosResponse } from 'axios';

const OaaSAPI = axios.create({
    baseURL: 'http://cds.10.131.36.40.nip.io'
})


function OaaS() {

    // Get Videos from OaaS
    async function getVideos(itemCount: number, offset: number): Promise<string[]> {
        const videos = await OaaSAPI.get('api/classes/example.video.hls/objects?limit='+itemCount+'&offset='+offset)
        //console.log(videos.data)
        return videos.data;
    }

    const test = () => {
        
    }
    // Upload a new video object to OaaS
    async function uploadVideo() {

    }
    // Get Files from OaaS
    async function getFiles() {

    }
    // Upload a new file object to OaaS
    async function uploadFiles() {

    }
    // Get Functions from OaaS
    async function getFunctions() {

    }
    // Upload a new function to OaaS
    async function uploadFunctions() {

    }
    // Get Objects from OaaS
    async function getObjects() {

    }
    // Get Classes from OaaS
    async function getClasses() {

    }
    // Upload a new class to OaaS
    async function uploadClass() {

    }

    return {getVideos}
}

export default OaaS;