<template>
    <div class="page-content">
        <div class="notification" ref="notification"></div>

        <div class="desktop-tablet-view">
            <div class="nav-bar">
                <div class="nav-columns w-row">
                    <div class="nav-column w-col w-col-3 w-col-tiny-4">
                        <a href="http://www.muso.ai" target="_blank" class="brand w-inline-block">
                            <img src="/images/MusoM.svg" alt="" class="brand-logo">
                        </a>
                        <div class="page-title">| Album Credits</div>
                    </div>
                    <div class="nav-column middle w-col w-col-6 w-col-tiny-4">
                        <div>{{data.title}}</div>
                    </div>
                    <div class="nav-column right w-col w-col-3 w-col-tiny-4">
                        <div data-w-id="1261b824-7a8f-153b-3efb-775d526f5c05" class="export-button" v-on:click="modalIsOpen = !modalIsOpen">
                            <div class="export-text">Export</div>
                            <img src="/images/Union.svg" height="13" alt="" class="export-icon">
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-container">
                <div class="content">
                    <div class="content-header">
                        <div class="flex-horizontal">
                            <div class="album-title">{{data.title}}</div>
                            <div class="content-date">{{data.currentDate}}</div>
                        </div>
                        <div class="performer-name">{{data.performer ? `by ${data.performer}` : ''}}</div>
                        <div class="album-information">
                            <div class="flex-horizontal">
                                <div class="album-art" v-bind:style="[data.avatarUrl ? { backgroundImage: `url(${data.avatarUrl})` } : {}]" >
                                </div>
                                <div class="album-information-titles">
                                    <div>Songs:</div>
                                    <div>Collaborators:</div>
                                    <div>Genres:</div>
                                    <div>Administrators:</div>
                                </div>
                                <div class="album-information-content">
                                    <div>{{data.trackCount || 0}}</div>
                                    <div>{{data.collaboratorCount || 0}}</div>
                                    <div>{{data.genres || '-'}}</div>
                                    <div>
                                        <span v-if="!data.admins || !data.admins.length"> - <br></span>
                                        <span v-for="admin in data.admins" :key="admin">{{admin}}<br></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex-loading" v-if="projectDataIsLoading">
                            <loader/>
                        </div>
                    </div>
                    <div class="seperator"></div>
                    <div v-for="(song, songIndex) in data.songs" :key="song.id">
                        <div class="song-title-container">
                            <div class="song-title">{{songIndex + 1}}. {{song.title}}</div>
                            <div class="song-collaborator-count">{{song.collaboratorCount}} Collaborators</div>
                        </div>
                        <div v-for="parentAssociation in song.collaboratorsGroup" :key="parentAssociation.parentAssociation">
                            <div class="parent-credit-row">
                                <div class="parent-credit-counter">- {{parentAssociation.list.length}} -</div>
                                <div class="parent-credit">{{parentAssociation.parentAssociation || ''}}</div>
                            </div>
                            <div v-for="(profile, profileIndex) in parentAssociation.list" :key="profileIndex"
                                  v-bind:class="{'collaborator-row':true, 'multiple':(parentAssociation.list.length > 1)}">
                                <div v-bind:style="[profile.avatarUrl ? { backgroundImage: `url(${profile.avatarUrl})` } : {}]" class="collaborator-image"></div>
                                <div v-bind:class="{'collaborator-content':true, 'more-than-one':(parentAssociation.list.length > 1)}">
                                    <div class="collaborator-names-container">
                                        <div class="collaborator-display-name">{{profile.fullName}}</div>
                                        <div class="collaborator-legal-name">{{profile.legalName}}</div>
                                    </div>
                                    <div class="collaborator-roles-container">
                                        <div class="role-text">Role:</div>
                                        <div v-for="(role, roleIndex) in profile.list" :key="roleIndex" class="role-credit">
                                            {{role.association || '-'}}
                                        </div>
                                    </div>
                                    <div class="collaborator-names-date">
                                        <div class="role-text">Date Accepted:</div>
                                        <div class="role-credit">{{formatDate(profile.dateAccepted) || '-'}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-loading" v-if="songsDataIsLoading">
                        <loader/>
                    </div>
                </div>
            </div>
        </div>
        <div class="mobile-view">
            <div class="navbar mobile">
                <img src="/images/MusoM.svg" height="18" alt="">
                <div class="album-title mobile"> {{data.title}} </div>
                <img src="/images/Union.svg" height="17"
                     data-w-id="7849f9c1-e52a-46d6-541d-bebeb416580c" alt=""
                     v-on:click="modalIsOpen = !modalIsOpen"
                >
            </div>
            <div class="header-mobile">
                <div class="album-art mobile" v-bind:style="[data.avatarUrl ? { backgroundImage: `url(${data.avatarUrl})` } : {}]" ></div>
                <div class="album-info-mobile">
                    <div class="album-title-mobile">{{data.title}}</div>
                    <div class="performer-mobile">{{data.performer ? `by ${data.performer}` : ''}}</div>
                    <div class="flex-horizontal left">
                        <div class="sub-information">
                            <div class="information-text">Genres: </div>
                            <div class="information-text">Admins</div>
                        </div>
                        <div>
                            <div class="information-text white">{{data.genres || '-'}}</div>
                            <div class="information-text white" v-if="!data.admins || !data.admins.length"> - <br></div>
                            <div class="information-text white" v-for="admin in data.admins" :key="admin">{{admin}}<br></div>
                        </div>
                    </div>
                </div>
                <div class="flex-loading" v-if="projectDataIsLoading">
                    <loader/>
                </div>
            </div>
            <div class="data-mobile">
                <div class="stat-left">
                    <div class="stat-gray">Songs</div>
                    <div class="stat-mobile">{{data.trackCount || 0}}</div>
                </div>
                <div class="stat-left">
                    <div class="stat-gray">Collaborators</div>
                    <div class="stat-mobile">{{data.collaboratorCount || 0}}</div>
                </div>
                <div>
                    <div class="stat-gray">Streams</div>
                    <div class="stat-mobile">{{data.streamCount | NumberFilter(true)}}</div>
                </div>
            </div>
            <div class="seperator-mobile"></div>
            <div class="flex-loading" v-if="songsDataIsLoading">
                <loader/>
            </div>
            <div v-for="(song, songIndex) in data.songs" :key="song.id">
                <div class="song-row-mobile">
                    <div class="album-art mobile-view" v-bind:style="[data.avatarUrl ? { backgroundImage: `url(${data.avatarUrl})` } : {}]" ></div>
                    <div>
                        <div class="song-title-mobile">{{songIndex + 1}}. {{song.title}}</div>
                        <div class="collaborators-text-mobile white">{{song.collaboratorCount}}</div>
                        <div class="collaborators-text-mobile"> Collaborators</div>
                    </div>
                </div>
                <div v-for="parentAssociation in song.collaboratorsGroup" :key="parentAssociation.parentAssociation">
                    <div class="collaborator-row-mobile">
                        <div class="parent-credit-counter">- {{parentAssociation.list.length}} -</div>
                        <div class="parent-credit">{{parentAssociation.parentAssociation || ''}}</div>
                    </div>
                    <div v-for="(profile, profileIndex) in parentAssociation.list" :key="profileIndex"
                         class="collaborator-content-row">
                        <div class="collaborator-image" v-bind:style= "[profile.avatarUrl ? { backgroundImage: `url(${profile.avatarUrl})` } : {}]" ></div>
                        <div class="flex-center-out">
                            <div class="collaborator-data-container">
                                <div class="artist-name">{{profile.fullName}}</div>
                                <div class="legal-name">{{profile.legalName}}</div>
                                <div v-for="(role, roleIndex) in profile.list" :key="roleIndex" class="collaborator-role-mobile">
                                    {{role.association || '-'}}
                                </div>
                            </div>
                            <div class="legal-name right">Accepted {{formatDate(profile.dateAccepted, 'DD/MM/YY') || '-'}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <transition name="modal">
            <div v-if="modalIsOpen" data-w-id="b704bae5-9765-2f58-6e81-8a3058752c5e" style="display: flex;" class="overlay">
                <div class="input-field-container">
                    <div class="background-image">
                        <div class="flex-left">
                            <img src="/images/logo-text-right.png" srcset="/images/logo-text-right.png 500w, /images/logo-text-right.png 800w, /images/logo-text-right.png 1080w, /images/logo-text-right.png 2246w" sizes="100vw" alt="" class="logo-icon">
                            <div class="sub-line">Your Credits. <br>Verified.</div>
                        </div>
                    </div>
                    <div class="form-container">
                        <div class="input-field-header">To Export Album Credits As PDF, please enter your email. We will send you an email with the rendered PDF.</div>
                        <div class="input-field-title">Name <span class="important">*</span></div>
                        <input class="input-field" type="text" placeholder="Enter your name" v-model="pdfRequestData.name" >
                        <div class="input-field-title">Email <span class="important">*</span></div>
                        <input class="input-field" type="email" placeholder="Enter your email" v-model="pdfRequestData.email" >
                        <div class="input-field-title">Company (optional)</div>
                        <input class="input-field" type="text" placeholder="Enter your company name" v-model="pdfRequestData.company" >

                        <div class="flex-loading" v-if="pdfIsRequesting">
                            <loader/>
                        </div>
                        <button class="submit-button w-button" v-on:click="requestForPDF" v-if="!pdfIsRequesting">Send My PDF</button>

                        <div data-w-id="89a60a28-e336-811b-e4ed-a172c3ba0acc" class="cancel-button" v-on:click="modalIsOpen = !modalIsOpen">
                            <img src="/images/White-X.svg" height="16" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import moment from 'moment';
    import Loader from 'components/ui/loader';
    import CollectionModel from 'models/collection';

    export default {
        name: 'Project',
        components: {
            Loader,
        },
        created() {
            this.loadData(this.$route.query.token);
        },
        data() {
            return {
                data: {
                    albumId: null,
                    title: '',
                    artist: '',
                    trackCount: '',
                    collaboratorCount: 0,
                    genres: '',
                    admins: [],
                    songs: [],
                    currentDate: this.formatDate(),
                },
                pdfRequestData: {
                    name: null,
                    email: null,
                    company: null,
                },
                modalIsOpen: false,
                pdfIsRequesting: false,
                songsDataIsLoading: false,
                projectDataIsLoading: false,
            };
        },
        methods: {
            formatDate(date = new Date(), format = 'MMMM DD, YYYY') {
                return moment(date).format(format);
            },
            validEmail: function (email) {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            loadData(token) {
                this.data.albumId = parseInt(this.$route.params.id, 10);

                if (!this.data.albumId) {
                    this.$notify('Missing album.', 'warning');
                }

                this.songsDataIsLoading = true;
                this.projectDataIsLoading = true;

                // Get album details.
                CollectionModel.getDetails(this.data.albumId).then(response => {
                    if (response.data) {
                        this.data.genres = response.data.genres;
                        this.data.title = response.data.title;
                        this.data.avatarUrl = response.data.avatarUrl;
                        this.data.trackCount = response.data.trackCount;
                        this.data.performer = response.data.performer;
                        this.data.streamCount = response.data.streamCount;
                        this.data.collaboratorCount = response.data.collaboratorCount;
                        this.data.admins = response.data.admins ? response.data.admins
                            .map(a => a.userDetail.email)
                                .filter((value, index, self) => self.indexOf(value) === index)
                            : [];

                        if (token) {
                            this.downloadPdf(token);
                        }
                    }
                    if (response.message) {
                        this.$notify(response.message, 'warning');
                    }
                }).catch(() => {
                    this.$notify(this.$t('common.errors.unavailable_service'), 'error');
                }).finally(() => {

                    this.projectDataIsLoading = false;
                });

                // Get songs of album.
                CollectionModel.getSongs(this.data.albumId).then(response => {
                    if (response.data && response.data.songs) {
                        this.data.songs = response.data.songs || [];
                    }
                    if (response.message) {
                        this.$notify(response.message, 'warning');
                    }
                }).catch(() => {
                    this.$notify(this.$t('common.errors.unavailable_service'), 'error');
                }).finally(() => {
                    this.songsDataIsLoading = false;
                });
            },
            requestForPDF() {

                if (!this.data.albumId) {
                    return this.$notify('Missing album.', 'error');
                }
                if (!this.pdfRequestData.name) {
                    return this.$notify('Missing full name.', 'error');
                }
                if (!this.pdfRequestData.email || !this.validEmail(this.pdfRequestData.email)) {
                    return this.$notify('Wrong email.', 'error');
                }

                this.pdfIsRequesting = true;

                // Get album details.
                CollectionModel.getPDF(this.data.albumId, {
                    fullName: this.pdfRequestData.name,
                    email: this.pdfRequestData.email,
                    company: this.pdfRequestData.company,
                }).then(response => {
                    if (response.message) {
                        this.$notify(response.message, 'warning');
                    }
                    if (response) {
                        this.modalIsOpen = false;
                        this.$refs.notification.classList.add('notification-success');
                        this.$refs.notification.textContent = 'Generating PDF';
                    }
                }).catch(() => {
                    this.$notify(this.$t('common.errors.unavailable_service'), 'error');
                }).finally(() => {
                    this.pdfIsRequesting = false;
                    this.pdfRequestData = {};

                    setTimeout(() => {
                        this.$refs.notification.classList.remove('notification-success');
                        this.$refs.notification.textContent = '';
                    }, 5000);
                });
            },
            downloadPdf(token) {
                // Download album pdf
                CollectionModel.downloadPDF(this.data.albumId, {
                    token,
                }).then(response => {
                    if (response.type === 'application/json') { /* TODO move to api service */
                        this.handleErrorFromBlob(response, (error) => {
                            this.$refs.notification.classList.add('notification-error');
                            this.$refs.notification.textContent = error.message;
                        })
                    } else {
                        // Download PDF
                        const url = window.URL.createObjectURL(new Blob([response], {type: 'application/pdf'}));
                        const link = document.createElement('a');
                        const title = this.data.title ? ' - ' + this.data.title : '';
                        const performer = this.data.performer ? ' - ' + this.data.performer : '';

                        link.href = url;
                        link.setAttribute('download', `Album Credits${title}${performer}.pdf`);
                        document.body.appendChild(link);
                        link.click();
                    }

                }).catch(() => {
                    this.$notify(this.$t('common.errors.unavailable_service'), 'error');
                }).finally(() => {
                    setTimeout(() => {
                        this.$refs.notification.classList.remove('notification-error');
                        this.$refs.notification.textContent = '';
                    }, 5000);
                });
            },
            handleErrorFromBlob(response, cb) {
                let reader = new FileReader();
                reader.onload = () => {
                    cb(JSON.parse(reader.result));
                };
                reader.readAsText(response);
            }
        },
    };
</script>

<style lang='scss' scoped>
    @import "../../assets/styles/webflow/index.scss";
    @import "../../assets/styles/webflow/pdf-pages.scss";

    .data-mobile {
        justify-content: flex-start;
    }
    .modal-enter-active, .modal-leave-active {
        transition: opacity .5s;
    }
    .modal-enter, .modal-leave-to {
        opacity: 0;
    }
    .flex-loading {
        margin: 20px;
    }
</style>
