import {create} from 'zustand'

interface OnBoardingState {
    createEmployee: boolean
    createClass: boolean
    testNotification: boolean
    createPrincipalReport: boolean
}

const useOnBoardingStore = create<OnBoardingState>()((set) => ({
    createEmployee: false,
    createClass: false,
    testNotification: false,
    createPrincipalReport: false,
    setCreateEmployee: (createEmployee: boolean) => set({createEmployee}),
    setCreateClass: (createClass: boolean) => set({createClass}),
    setTestNotification: (testNotification: boolean) => set({testNotification}),
    setCreatePrincipalReport: (createPrincipalReport: boolean) => set({createPrincipalReport}),
}))

export default useOnBoardingStore