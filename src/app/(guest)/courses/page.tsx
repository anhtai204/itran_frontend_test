"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { CourseListing } from "@/components/course/courses"

export default function CoursesPage() {
  
    return (
        <>
            <Header/>
            <CourseListing/>
            <Footer/>
        </>
    )
}

