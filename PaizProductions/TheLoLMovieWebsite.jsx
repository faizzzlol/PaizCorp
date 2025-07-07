// The LoL: The Movie - Modern Movie Website UI
// Inspired by common modern movie promo websites
// Theme: Clean, cinematic, bold headlines, immersive visuals

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PlayIcon, FilmIcon, StarIcon } from "lucide-react";

export default function TheLoLMovieWebsite() {
  return (
    <main className="bg-black text-white min-h-screen font-sans">
      <section className="relative bg-cover bg-center h-[90vh]" style={{ backgroundImage: "url('/thelol-banner.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
        <div className="relative z-10 p-10 flex flex-col justify-end h-full">
          <h1 className="text-5xl font-bold drop-shadow-lg">The LoL: The Movie</h1>
          <p className="text-lg mt-4 max-w-xl drop-shadow-md">
            Witness the untold story of The Legend of Legiona – rebellion, war, power, and unity.
          </p>
          <div className="mt-6 flex gap-4">
            <Button className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2">
              <PlayIcon className="w-4 h-4" /> Watch Trailer
            </Button>
            <Button variant="outline" className="text-white border-white">Get Tickets</Button>
          </div>
        </div>
      </section>

      <section className="bg-zinc-900 p-10">
        <Tabs defaultValue="synopsis">
          <TabsList className="bg-zinc-800">
            <TabsTrigger value="synopsis">Synopsis</TabsTrigger>
            <TabsTrigger value="cast">Cast</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="lore">TLIO Lore</TabsTrigger>
          </TabsList>

          <TabsContent value="synopsis">
            <div className="mt-6 space-y-4">
              <h2 className="text-3xl font-semibold">About the Movie</h2>
              <p>
                In an alternate universe where nations rise and fall within Minecraft's vast realm,
                one legendary nation – The LoL – emerges to battle tyranny, betrayal, and chaos.
                From the creation of TLIO to the fall of UltraX2020's communist regime,
                this cinematic masterpiece brings Faiz4224, Imii Kun, and Dyno's iconic journey to life.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="cast">
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <img src="/cast/faiz4224.jpg" alt="Faiz4224" className="rounded-xl mb-2" />
                  <p className="font-semibold">Faiz4224</p>
                  <p className="text-sm text-zinc-400">as Himself / President</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <img src="/cast/imii-kun.jpg" alt="Imii Kun" className="rounded-xl mb-2" />
                  <p className="font-semibold">Imii Kun</p>
                  <p className="text-sm text-zinc-400">as Himself / VP</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <img src="/cast/lonelydynozz.jpg" alt="Dyno" className="rounded-xl mb-2" />
                  <p className="font-semibold">Dyno</p>
                  <p className="text-sm text-zinc-400">as Himself / Defence Minister</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <img src="/cast/ultrax2020.jpg" alt="UltraX2020" className="rounded-xl mb-2" />
                  <p className="font-semibold">UltraX2020</p>
                  <p className="text-sm text-zinc-400">as Himself / The Opponent</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="gallery">
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <img src="/gallery/scene1.jpg" className="rounded-xl" alt="Scene 1" />
              <img src="/gallery/scene2.jpg" className="rounded-xl" alt="Scene 2" />
              <img src="/gallery/scene3.jpg" className="rounded-xl" alt="Scene 3" />
            </div>
          </TabsContent>

          <TabsContent value="lore">
            <div className="mt-6 space-y-4">
              <h3 className="text-2xl font-bold">TLIO Intelligence Lore</h3>
              <p>
                Founded in resistance against the oppressive UltraX2020, TLIO became the shield of The LoL Nation.
                Strategic, silent, and unbreakable – the organization ensured peace during post-war reconstruction.
              </p>
              <ul className="list-disc list-inside">
                <li>Founded by Faiz4224 during communist uprising</li>
                <li>Rebranded from "Persatuan Pengkhianat TheLoL"</li>
                <li>Inspired by real-world agencies like the CIA & MI6</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <footer className="bg-black text-zinc-400 text-center p-6 mt-10 text-sm">
        &copy; 2025 The LoL: The Movie. Crafted by the LoL Nation. All rights reserved.
      </footer>
    </main>
  );
}
