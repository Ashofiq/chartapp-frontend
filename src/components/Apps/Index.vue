<template>
    <div class="row">
        <div class="col-lg-3 pb-3" v-for="(item, index) in apps" :key="index">
            <div class="card">
                <div class="empty">
                    <div class="empty-img">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            class="icon icon-tabler icon-tabler-align-box-bottom-right" 
                            width="100" height="70" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
                            <path d="M11 15v2"></path>
                            <path d="M14 11v6"></path>
                            <path d="M17 13v4"></path>
                        </svg>
                    </div>
                    <p class="empty-title">{{ item.name }}</p>
                    <p class="empty-subtitle text-muted">
                        {{ item.type }}
                    </p>
                    <a href="" @click="setData(item)" data-bs-toggle="modal" data-bs-target="#modal-report">
                        edit
                    </a>
                </div>
            </div>
        </div>

        <div class="col-lg-3" style="cursor: pointer;">
            <div class="card" data-bs-toggle="modal" data-bs-target="#modal-report">
                <div class="empty">
                    <div class="empty-img">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="35" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                        </svg>
                    </div>
                    <p class="empty-title">Create App</p>
                    <p class="empty-subtitle text-muted">
                        Create App And Analize
                    </p>
                
                </div>
            </div>
        </div>

    </div>

    <!-- modal -->

    <div class="modal modal-blur fade" id="modal-report" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New App</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form id="form">
            <div class="modal-body">
            
                <div class="row">
                    <div class="col-md-12">
                        <div class="mb-3">
                            <label class="form-label">Name</label>
                            <input type="text" v-model="app.name" class="form-control" 
                            placeholder="Your App name">
                            <small class="message text-danger">{{ validation.firstError('app.name') }}</small>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="mb-3">
                            <label class="form-label">App Type</label>
                            <select class="form-select" v-model="app.type">
                                <slot v-for="(type, index) in types" :key="index">
                                    <option :value="type">{{ type }}</option>
                                </slot>
                            </select>
                            <small class="message text-danger">{{ validation.firstError('app.type') }}</small>
                        </div>
                    </div>
                </div>
            
            
            </div>
          
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12" v-if="app.type == 'googleSheet'">
                        <div class="mb-3">
                            <label class="form-label">Google Shhet url</label>
                            <div class="input-group input-group-flat">
                                <input v-model="app.googleSheetUrl" type="text" class="form-control" autocomplete="off">
                                <small class="message text-danger">{{ validation.firstError('app.googleSheetUrl') }}</small>

                            </div>
                        </div>
                    </div>
                
                <div class="col-lg-12" v-if="['csv', 'excel'].includes(app.type)">
                    <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">File (Excel Or CSV)</h3>
                        <slot v-if="app.id">
                            <span>{{ app.file.replace('tmp/', '') }}</span>
                        </slot>
                        <div class="dropzone" id="dropzone-default" autocomplete="off" novalidate>
                        <div class="fallback">
                            <input name="file" type="file"   />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
          </form>

          <div class="modal-footer">
            <a href="#" id="close" class="btn btn-link link-secondary" data-bs-dismiss="modal">
              Cancel
            </a>
            <slot v-if="!app.id">
                <a @click="createApp()" class="btn btn-primary ms-auto">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                    Create new app
                </a>
            </slot>

            <slot v-else>
                <a @click="updateApp()" class="btn btn-primary ms-auto">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                    Update app
                </a>
            </slot>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import helper from "./../../helpers/Helper.js";
import {Validator} from 'simple-vue-validator'
import axios from 'axios'

var Helper = new helper();

export default {
    name: 'App',
    data(){
        return{
            app:{
                name: null,
                type: null,
                googleSheetUrl: null
            },
            apps:[],
            types: Helper.appTypes()
        }
    },

    methods:{
        createApp(){

            this.$validate().then((res) => {
                const error = this.validation.countErrors();
                // If there is an error
                console.log('error', error, res);
                if (error > 0) {
                    console.log(this.validation.allErrors());
                    this.$toast(
                        'You need to fill ' + error + ' more empty mandatory fields',
                        'warning'
                    );
                    return false;
                }

                if (res) {
                    // this.$root.submit = true;
                    var form = document.getElementById("form");
                    var formData = new FormData(form);
                    formData.append('name', this.app.name)
                    formData.append('type', this.app.type)
                    formData.append('googleSheetUrl', this.app.googleSheetUrl?? '')

                    console.log('dd');
                    axios
                    .post(process.env.VUE_APP_BASE_URL+"/api/v1/app", formData)
                    .then((res1) => {
                        console.log(res1);
                        document.getElementById('close').click();
                        this.$toast(
                           res1,
                            'success'
                        );
                    })
                    .catch((error) => console.log(error))
                    .then((alw) => setTimeout(() => (console.log(alw)), 200));
                }

            });
        },

        updateApp(){
            var form = document.getElementById("form");
            var formData = new FormData(form);
            formData.append('name', this.app.name)
            formData.append('type', this.app.type)
            formData.append('appId', this.app.id)
            formData.append('googleSheetUrl', this.app.googleSheetUrl)

            axios
                .post(process.env.VUE_APP_BASE_URL+"/api/v1/app/update", formData)
                .then((res1) => {
                    console.log(res1);
                    document.getElementById('close').click();
                    this.$toast(
                        res1,
                        'success'
                    );

                    window.location.reload()
                })
                .catch((error) => console.log(error))
                .then((alw) => setTimeout(() => (console.log(alw)), 200));
        },

        setData(item){
            this.app = item;
        },

        getAllApp(){
            axios.get(process.env.VUE_APP_BASE_URL+"/api/v1/app")
                .then(res =>{
                    console.log(res.data);
                    this.apps = res.data
                })
        }
    },

    created(){
        this.getAllApp();
    },

    validators: {
        "app.name": function (value) {
            return Validator.value(value).required('name is require');
        },
        "app.type": function (value) {
            return Validator.value(value).required('type is require');
        },
        // "app.googleSheetUrl": function (value) {
        //     return Validator.value(value).required('googleSheetUrl is require');
        // },
    }

}
</script>