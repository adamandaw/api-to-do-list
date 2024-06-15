<template>
    <div class="row justify-content-center mt-5">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header bg-dark">
                    <div class="row">
                        <div class="col-md-6">
                            <h5 class="text-light float-start">{{title}}</h5>
                        </div>
                        <div class="col-md-6">
                            <button @click="createTask" class="btn btn-success btn-sm float-end">Nouveau +</button>
                        </div>
                    </div>
                </div>
                
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table text-center">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Date & Time</th>
                                    <th>Detail</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(task, index) in tasks" :key="index">
                                    <td>{{index + 1}}</td>
                                    <td>{{task.title}}</td>
                                    <td>{{task.date}} | {{task.time}}</td>
                                    <td>
                                        {{task.detail.length <= 10 ? task.detail : task.detail.substr(0, 10) + '...'}}
                                    </td>
                                    <td>
                                        <button @click="editTask(task)" class="btn btn-primary btn-sm mx-1">Edit</button>
                                        <button @click="removeTask(task)" class="btn btn-danger btn-sm mx-1">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="taskModal" tabindex="-1" aria-labelledby="taskModalLabel" aria-hidden="true">
    <div :class="`modal-dialog modal-dialog-centered ${!deleteMode ? 'modal-lg' : 'modal-sm'}`">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="taskModalLabel" v-show="!deleteMode">{{!editMode ? 'Create New Task' : 'Update Task'}}</h5>
            <h5 class="modal-title" id="taskModalLabel" v-show="deleteMode">Delete Task</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="row" v-show="!deleteMode">
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input type="text" class="form-control" v-model="taskData.title">
                        <span class="text-danger" v-show="taskErrors.title">Title is required</span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="date">Date</label>
                        <input type="date" class="form-control" v-model="taskData.date">
                        <span class="text-danger" v-show="taskErrors.date">Date is required</span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="time">Time</label>
                        <input type="time" class="form-control" v-model="taskData.time">
                        <span class="text-danger" v-show="taskErrors.time">Time is required</span>
                    </div>
                </div>
            </div>
            <div class="row" v-show="!deleteMode">
                <div class="col-md-12">
                    <div class="form-group">
                        <label for="detail">Detail</label>
                        <textarea class="form-control" rows="3" v-model="taskData.detail"></textarea>
                    </div>
                </div>
            </div>

            <h5 class="text-center" v-show="deleteMode">Are you sure you want to delete this task?</h5>
        </div>
        <div class="modal-footer" v-show="!deleteMode">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
            <button type="button" @click="!editMode ? storeTask() : updateTask()" class="btn btn-primary">{{!editMode ? 'Create Task' : 'Save Changes'}}</button>
        </div>
        <div class="modal-footer" v-show="deleteMode">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
            <button type="button" @click="deleteTask" class="btn btn-primary">Effacer</button>
        </div>
        </div>
    </div>
    </div>

</template>

<script>
import { Link, router } from "@inertiajs/vue3";
import { reactive, ref } from "vue";
import axios from 'axios'
export default {
    setup: () => ({
        title: 'Ma liste'
    }),
   
    data() {
        return {
            editMode: false,
            deleteMode: false,
            taskData: {
                id: '',
                title: '',
                date: '',
                time: '',
                detail: '',
            },
            taskErrors: {
                title: false,
                date: false,
                time: false,
            },
            tasks: {},
        }
    },
    mounted() {
        this.getTasks()
    },
    methods: {
        getTasks() {
            axios.get(window.url + '/to-do').then(response => {
                this.tasks = response.data
                console.log(`La reponse : ${response}` )
            }).catch(errors => {
                console.log(errors)
            });
        },
        deleteTask() {
            axios.post(window.url + `/todo/${this.params.id}` + this.taskData.id).then(response => {
                this.getTasks()
                console.log(response)
            }).catch(errors => {
                console.log(errors)
            }).finally(() => {
                $('#taskModal').modal('hide')
            });
        },
        removeTask(task) {
            this.deleteMode = true
            this.taskData.id = task.id
            $('#taskModal').modal('show')
        },
        updateTask() {
            this.taskData.title == '' ? this.taskErrors.title = true : this.taskErrors.title = false
            this.taskData.date == '' ? this.taskErrors.date = true : this.taskErrors.date = false
            this.taskData.time == '' ? this.taskErrors.time = true : this.taskErrors.time = false

            if(this.taskData.title && this.taskData.date && this.taskData.time) {
                axios.post(window.url + `/todo/${this.params.id}` + this.taskData.id, this.taskData).then(response => {
                    this.getTasks()
                }).catch(errors => {
                    console.log(errors)
                }).finally(() => {
                    $('#taskModal').modal('hide')
                });
            }
        },
        editTask(task) {
            this.deleteMode = false
            this.editMode = true
            this.taskData = {
                id: task.id,
                title: task.title,
                date: task.date,
                time: task.time,
                detail: task.detail,
            }
            this.taskErrors = {
                title: false,
                date: false,
                time: false,
            }
            // j'affiche le modal ()
            $('#taskModal').modal('show')
        },
        createTask() {
            // par defaut null 
            this.deleteMode = false
            this.editMode = false
            this.taskData = {
                id: '',
                title: '',
                date: '',
                time: '',
                detail: '',
            }
            this.taskErrors = {
                title: false,
                date: false,
                time: false,
            }
            $('#taskModal').modal('show')
        },
        storeTask() {
            this.taskData.title == '' ? this.taskErrors.title = true : this.taskErrors.title = false
            this.taskData.date == '' ? this.taskErrors.date = true : this.taskErrors.date = false
            this.taskData.time == '' ? this.taskErrors.time = true : this.taskErrors.time = false

            if(this.taskData.title && this.taskData.date && this.taskData.time) {
                // router.post('/todo',task);
                axios.post(window.url + 'api/todo', this.taskData).then(response => {
                    this.getTasks()
                    console.log(response)
                }).catch(errors => {
                    console.log(errors)
                }).finally(() => {
                    $('#taskModal').modal('hide')
                });
            }
        }
    }
}
</script>