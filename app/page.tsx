'use client'

import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Stethoscope, Heart, Brain, Pill, Activity } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const pulse = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  }

  const [bannerWidth, setBannerWidth] = useState(0)
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (bannerRef.current) {
      setBannerWidth(bannerRef.current.scrollWidth)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <motion.div
          className="flex items-center justify-center mb-6"
          {...pulse}
        >
          <Stethoscope className="w-16 h-16 text-primary" />
        </motion.div>
        <motion.h1 
          className="text-5xl font-bold mb-6"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Welcome to MediChat AI
        </motion.h1>
        <motion.p 
          className="text-xl mb-8 text-muted-foreground"
          {...fadeInUp}
        >
          Get instant medical advice from our AI assistant
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="/chat">Start Your Consultation</Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        {[
          { Icon: Heart, text: "Cardiology" },
          { Icon: Brain, text: "Neurology" },
          { Icon: Pill, text: "Pharmacy" },
          { Icon: Activity, text: "General Health" },
        ].map(({ Icon, text }, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            variants={fadeInUp}
          >
            <div className="bg-primary/10 text-primary p-4 rounded-full mb-2">
              <Icon className="w-8 h-8" />
            </div>
            <span className="text-sm font-medium">{text}</span>
          </motion.div>
        ))}
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-primary/10 py-2">
        <div 
          ref={bannerRef}
          className="whitespace-nowrap"
        >
          <motion.div
            className="inline-block"
            animate={{
              x: [-bannerWidth, 0],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            <span className="text-sm text-primary-foreground">
              MediChat AI provides general information. Always consult with a qualified healthcare professional for medical advice.
            </span>
          </motion.div>
          <motion.div
            className="inline-block"
            animate={{
              x: [-bannerWidth, 0],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            <span className="text-sm text-muted-foreground">
              MediChat AI provides general information. Always consult with a qualified healthcare professional for medical advice.
            </span>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="absolute top-4 right-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <ThemeToggle />
      </motion.div>
    </div>
  )
}