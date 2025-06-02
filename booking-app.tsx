import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, Clock, MessageCircle, Phone, User, Briefcase, MapPin } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function BookingApp() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [service, setService] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [note, setNote] = useState("")
  const [errors, setErrors] = useState({})

  const services = [
    "Limpeza Ar-condicionado",
    "Manutenção Ar-condicionado",
    "Instalação de Ar-condicionado",
    "Conserto de Geladeira",
    "Conserto de Micro-ondas",
  ]

  const timeSlots = [
    "08:00", "09:00", "10:00", 
    "11:00", "14:00", "15:00", 
    "16:00", "17:00", "18:00",
  ]

  const validateForm = () => {
    const newErrors = {}
    if (!name.trim()) newErrors.name = "Nome é obrigatório"
    if (!phone.trim()) newErrors.phone = "Telefone é obrigatório"
    if (!address.trim()) newErrors.address = "Endereço é obrigatório"
    if (!service) newErrors.service = "Serviço é obrigatório"
    if (!date) newErrors.date = "Data é obrigatória"
    if (!time) newErrors.time = "Horário é obrigatório"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return
    const message = encodeURIComponent(
      `Olá! Meu nome é *${name}* e gostaria de agendar um serviço.\n\n` +
      `📍 *Endereço:* ${address}\n📋 *Serviço:* ${service}\n📅 *Data:* ${date}\n⏰ *Horário:* ${time}\n📞 *Telefone:* ${phone}\n` +
      (note ? `📝 *Observações:* ${note}` : "") +
      `\n\nAguardo confirmação.`
    )
    const phoneNumber = "5547996960063"
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  const getMinMaxDate = () => {
    const today = new Date()
    const min = today.toISOString().split("T")[0]
    const maxDate = new Date()
    maxDate.setDate(today.getDate() + 30)
    const max = maxDate.toISOString().split("T")[0]
    return { min, max }
  }

  const isValidDate = (dateStr) => {
    const date = new Date(dateStr)
    const day = date.getDay()
    return day !== 6 // 6 = sábado (Saturday)
  }

  const { min, max } = getMinMaxDate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              <Calendar className="h-6 w-6" />
              Agendamento de Serviço
            </CardTitle>
            <p className="text-green-100">Preencha os dados para agendar via WhatsApp</p>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <User className="h-4 w-4" /> Nome Completo
                </Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Digite seu nome" className={errors.name ? "border-red-500" : ""} />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Telefone
                </Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(47) 99999-9999" className={errors.phone ? "border-red-500" : ""} />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Endereço
                </Label>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Rua, número, bairro, cidade" className={errors.address ? "border-red-500" : ""} />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" /> Serviço Desejado
                </Label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger className={errors.service ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecione o serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((item) => (
                      <SelectItem key={item} value={item}>{item}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.service && <p className="text-red-500 text-sm">{errors.service}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Data
                  </Label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => {
                      const selected = e.target.value
                      if (isValidDate(selected)) setDate(selected)
                      else alert("Agendamentos aos sábados não são permitidos.")
                    }}
                    min={min}
                    max={max}
                    className={errors.date ? "border-red-500" : ""}
                  />
                  {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Horário
                  </Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger className={errors.time ? "border-red-500" : ""}>
                      <SelectValue placeholder="Horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Observações (opcional)</Label>
                <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Alguma informação adicional?" rows={3} />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                <MessageCircle className="h-4 w-4 mr-2" /> Enviar WhatsApp
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
