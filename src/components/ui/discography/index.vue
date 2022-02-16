<template>
    <div class="page-content" v-infinite-scroll="loadSongsData" infinite-scroll-disabled="infiniteScrollIsDisabled" infinite-scroll-distance="1000">
        <div class="notification" ref="notification"></div>

        <div class="desktop-tablet-view">
            <div class="nav-bar">
                <div class="nav-columns w-row">
                    <div class="nav-column w-col w-col-3 w-col-tiny-4">
                        <a href="http://www.muso.ai" target="_blank" class="brand w-inline-block">
                            <img src="~/assets/images/MusoM.svg" alt="" class="brand-logo">
                        </a>
                        <div class="page-title">| Discography</div>
                    </div>
                    <div class="nav-column middle w-col w-col-6 w-col-tiny-4">
                        <div>{{data.fullName}}</div>
                    </div>
                    <div class="nav-column right w-col w-col-3 w-col-tiny-4">
                        <div data-w-id="1261b824-7a8f-153b-3efb-775d526f5c05" class="export-button" v-on:click="modalIsOpen = !modalIsOpen">
                            <div class="export-text">Export</div>
                            <img src="~/assets/images/Union.svg" height="13" alt="" class="export-icon"></div>
                    </div>
                </div>
            </div>
            <div class="content-container">
                <div class="content">
                    <div class="content-header">
                        <div class="flex-horizontal">
                            <div class="album-title">discography</div>
                            <div class="content-date">{{data.currentDate}}</div>
                        </div>
                        <div class="performer-name-discography">{{data.fullName}}</div>
                        <img src="~/assets/images/Shield-Icon.png" v-if="data.isVerified" width="32" alt="" class="verified-icon">
                        <div class="album-information">
                            <div class="flex-horizontal">
                                <div class="profile-picture" v-bind:style="[data.avatarUrl ? { backgroundImage: `url(${data.avatarUrl})` } : {}]" >
                                </div>
                                <div class="album-information-titles">
                                    <div>Songs:</div>
                                    <div>Streams</div>
                                    <div>Connections</div>
                                </div>
                                <div class="album-information-content">
                                    <div>{{data.creditCount | NumberFilter}}</div>
                                    <div>{{data.streamCount | NumberFilter}}</div>
                                    <div>{{data.connectionCount | NumberFilter}}</div>
                                </div>
                            </div>
                            <div class="brand-text-container">
                                <img src="~/assets/images/logo-text-muso.png" width="55" alt="" class="brand-image">
                                <div class="text-block">Verified Credits<br>Captured by Muso.AI</div>
                            </div>
                        </div>
                        <div class="flex-loading" v-if="profileDataIsLoading">
                            <loader/>
                        </div>
                    </div>
                    <div class="row-header">
                        <div class="song-header">Song:</div>
                        <div class="album-header">Album:</div>
                        <div class="role-header">Role:</div>
                        <div class="song-collaborator-count">Streams:</div>
                    </div>
                    <div v-for="releaseDate in Object.keys(data.releases)" :key="releaseDate">
                        <div class="parent-credit-row">
                            <div class="release-date">{{releaseDate}}</div>
                        </div>
                        <div v-for="song in data.releases[releaseDate]" :key="song.id"
                             v-bind:class="{'collaborator-row':true, 'multiple':(data.releases[releaseDate].length > 1)}">
                            <div v-bind:style="[song.avatarUrl ? { backgroundImage: `url(${song.avatarUrl})` } : {}]" class="album-image"></div>
                            <div v-bind:class="{'collaborator-content':true, 'more-than-one':(data.releases[releaseDate].length > 1)}">
                                <div class="album-names-container">
                                    <div class="song-name-discography">{{song.title}}</div>
                                    <div class="collaborator-legal-name">by {{song.performer}}</div>
                                </div>
                                <div class="album-title-row">
                                    <div class="role-credit">{{song.collectionTitle}}</div>
                                </div>
                                <div class="song-role-header">
                                    <div v-for="role in Object.keys(song.associations)" :key="role" class="role-credit">
                                        {{role || '-'}}
                                    </div>
                                </div>
                                <div class="stream-header">
                                    <div class="role-credit">{{song.streamCount | NumberFilter }}</div>
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
                <img src="~/assets/images/MusoM.svg" height="18" alt="">
                <div class="album-title mobile">{{data.fullName}} - discography</div>
                <img src="~/assets/images/Union.svg" height="17" data-w-id="7849f9c1-e52a-46d6-541d-bebeb416580c" alt=""
                     v-on:click="modalIsOpen = !modalIsOpen">
            </div>
            <div class="header-mobile">
                <div class="profile mobile" v-bind:style="[data.avatarUrl ? { backgroundImage: `url(${data.avatarUrl})` } : {}]" ></div>
                <div class="profile-info-middle">
                    <div class="profile-title-discography">{{data.firstName}}</div>
                    <div class="flex-horizontal">
                        <div class="profile-title-discography">{{data.lastName}}</div>
                        <img src="~/assets/images/Shield-Icon.png" v-if="data.isVerified" width="30" height="30" alt="">
                    </div>
                    <div class="performer-discography">{{data.credits | JoinFilter(', ', ' & ')}}</div>
                </div>
            </div>
            <div class="data-mobile">
                <div class="stat-left discography">
                    <div class="stat-gray">Credits</div>
                    <div class="stat-mobile">{{data.creditCount | NumberFilter(true)}}</div>
                </div>
                <div class="stat-left discography">
                    <div class="stat-gray">Streams</div>
                    <div class="stat-mobile">{{data.streamCount | NumberFilter(true)}}</div>
                </div>
                <div>
                    <div class="stat-gray">Connections</div>
                    <div class="stat-mobile">{{data.connectionCount | NumberFilter(true)}}</div>
                </div>
            </div>
            <div class="flex-loading" v-if="profileDataIsLoading">
                <loader/>
            </div>
            <div class="seperator-mobile"></div>
            <div class="song-row-mobile">
                <div class="credit-numbers">- {{data.creditCount | NumberFilter(true)}} -</div>
                <div class="credits-title">CREDITS</div>
            </div>
            <div v-for="(song, songIndex) in data.songs" :key="song.id"
                 v-bind:class="{'song':true, 'first':(songIndex === 0)}">
                <div class="album-art-mobile">
                    <img v-bind:src="[song.avatarUrl ? song.avatarUrl : '/images/default-avatars/project_default_square.png']"  alt="">
                </div>
                <div class="song-content">
                    <div class="flex-center-out">
                        <div class="mobile-artist">{{song.performer}}</div>
                        <div class="mobile-artist right">{{song.collectionReleaseDate | DateFilter}}</div>
                    </div>
                    <div class="flex-center-out">
                        <div class="song-title-mobile-row">{{song.title}}</div>
                        <div class="mobile-artist right hidden">{{song.collectionReleaseDate | DateFilter}}</div>
                    </div>
                    <div class="flex-center-out">
                        <div class="mobile-artist">{{Object.keys(song.associations) | JoinFilter}}</div>
                        <div class="mobile-artist right">
                            <span class="white-text">{{song.streamCount | NumberFilter(true)}} </span>
                            Streams
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-loading" v-if="songsDataIsLoading">
                <loader/>
            </div>
        </div>

        <transition name="modal">
            <div v-if="modalIsOpen" data-w-id="b704bae5-9765-2f58-6e81-8a3058752c5e" style="display: flex;" class="overlay">
                <div class="input-field-container">
                    <div class="background-image">
                        <div class="flex-left">
                            <img src="~/assets/images/Asset-13x.png" srcset="~/assets/images/Asset-13x-p-500.png 500w, ~/assets/images/Asset-13x-p-800.png 800w, ~/assets/images/Asset-13x-p-1080.png 1080w, ~/assets/images/Asset-13x.png 2246w" sizes="100vw" alt="" class="logo-icon">
                            <div class="sub-line">Your Credits. <br>Verified.</div>
                        </div>
                    </div>
                    <div class="form-container">
                        <div class="input-field-header">To export discography as PDF, please enter your email. We will send you an email with the rendered PDF.</div>
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
                            <img src="~/assets/images/White-X.svg" height="16" alt="">
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
    import ProfileModel from 'models/profile';

    export default {
        name: 'Discography',
        components: {
            Loader,
        },
        created() {
            this.loadData(this.$route.query.token);
        },
        data() {
            return {
                data: {
                    profileId: null,
                    fullName: '',
                    creditCount: 0,
                    streamCount: 0,
                    connectionCount: 0,
                    releases: {},
                    credits: [],
                    songs: [],
                    isVerified: true,
                    currentDate: this.$options.filters.DateFilter(),
                },
                pdfRequestData: {
                    name: null,
                    email: null,
                    company: null,
                },
                songsPage: 0,
                modalIsOpen: false,
                pdfIsRequesting: false,
                songsDataIsLoading: false,
                profileDataIsLoading: false,
                infiniteScrollIsDisabled: false,
            };
        },
        methods: {
            validEmail: function (email) {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            loadData(token) {
                this.data.profileId = parseInt(this.$route.params.id, 10);

                if (!this.data.profileId) {
                    this.$notify('Missing profile.', 'warning');
                }

                this.profileDataIsLoading = true;

                // Get profile details.
                ProfileModel.getDetails(this.data.profileId).then(response => {
                    if (response.data) {
                        this.data.fullName = response.data.fullName;
                        this.data.avatarUrl = response.data.avatarUrl;
                        this.data.creditCount = response.data.creditCount;
                        this.data.isVerified = response.data.isVerified;
                        this.data.streamCount = response.data.streamCount;
                        this.data.connectionCount = response.data.connectionCount;
                        this.data.credits = response.data.credits.map(c => c.association);

                        // Split the full name
                        const names = response.data.fullName.split(' ');

                        this.data.firstName = names.shift().toUpperCase();
                        this.data.lastName = names.join(' ').toUpperCase();

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
                    this.profileDataIsLoading = false;
                });

                this.loadSongsData();
            },
            loadSongsData() {
                this.songsDataIsLoading = true;
                this.infiniteScrollIsDisabled = true;

                // Get songs with collaborations of profile.
                ProfileModel.getSongsCollaborations(this.data.profileId, {
                    limit: 20,
                    page: ++this.songsPage,
                }).then(response => {
                    if (response.data && response.data.songs) {
                        if (response.data.songs.length >= 20) {
                            // Stop infinite scroll
                            this.infiniteScrollIsDisabled = false;
                        }

                        this.data.songs.push(...response.data.songs);

                        response.data.songs.forEach((song) => {
                            const releaseDate = this.$options.filters.DateFilter(song.collectionReleaseDate);
                            this.data.releases[releaseDate] = this.data.releases[releaseDate] || [];

                            this.data.releases[releaseDate].push(song);
                        });
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

                if (!this.data.profileId) {
                    return this.$notify('Missing profile.', 'error');
                }
                if (!this.pdfRequestData.name) {
                    return this.$notify('Missing full name.', 'error');
                }
                if (!this.pdfRequestData.email || !this.validEmail(this.pdfRequestData.email)) {
                    return this.$notify('Wrong email.', 'error');
                }

                this.pdfIsRequesting = true;

                // Get profile details.
                ProfileModel.getPDF(this.data.profileId, {
                    fullName: this.pdfRequestData.name,
                    email: this.pdfRequestData.email,
                    company: this.pdfRequestData.company,
                }).then(response => {
                    if (response.message) {
                        this.$notify(response.message, 'warning');
                    }
                    if (response) {
                        this.modalIsOpen = false;
                        this.$refs.notification.textContent = 'Generating PDF';
                        this.$refs.notification.classList.add('notification-success');
                    }
                }).catch(() => {
                    this.$notify(this.$t('common.errors.unavailable_service'), 'error');
                }).finally(() => {
                    this.pdfIsRequesting = false;
                    this.pdfRequestData = {};

                    setTimeout(() => {
                        this.$refs.notification.textContent = '';
                        this.$refs.notification.classList.remove('notification-success');
                    }, 5000);
                });
            },
            downloadPdf(token) {
                // Download profile pdf
                ProfileModel.downloadPDF(this.data.profileId, {
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

                        link.href = url;
                        link.setAttribute('download', `Discography - ${this.data.fullName}.pdf`);
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
