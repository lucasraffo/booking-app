"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User, Phone, Briefcase, MessageSquare, Smartphone } from "lucide-react"

export default function ServiceBookingApp() {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    servico: "",
    data: "",
    horario: "",
    observacoes: "",
  })

  const servicos = [
    "Instalação de Ar Condicionado",
    "Manutenção de Ar Condicionado",
    "Limpeza de Ar Condicionado",
    "Reparo de Ar Condicionado",
    "Instalação Elétrica",
    "Manutenção Elétrica",
  ]

  const horarios = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleClear = () => {
    setFormData({
      nome: "",
      telefone: "",
      servico: "",
      data: "",
      horario: "",
      observacoes: "",
    })
  }

  const handleWhatsAppSend = () => {
    const message = `Olá! Gostaria de agendar um serviço:

*Nome:* ${formData.nome}
*Telefone:* ${formData.telefone}
*Serviço:* ${formData.servico}
*Data:* ${formData.data}
*Horário:* ${formData.horario}
${formData.observacoes ? `*Observações:* ${formData.observacoes}` : ""}

Aguardo confirmação!`

    const whatsappUrl = `https://wa.me/5547999999999?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const isFormValid = formData.nome && formData.telefone && formData.servico && formData.data && formData.horario

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-16 right-16 opacity-20">
        <div className="bg-gray-300 rounded-lg p-4 w-48 h-32 relative">
          <div className="absolute top-2 left-2 right-2 h-1 bg-gray-400 rounded"></div>
          <div className="absolute bottom-8 left-4 right-4 space-y-1">
            <div className="h-2 bg-gray-500 rounded"></div>
            <div className="h-2 bg-gray-500 rounded"></div>
            <div className="h-2 bg-gray-500 rounded"></div>
          </div>
        </div>
      </div>

      <div className="absolute top-48 right-8 opacity-20">
        <div className="bg-gray-400 rounded-lg p-3 w-20 h-20 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-600 rounded-full relative">
            <div className="absolute inset-2 border-2 border-gray-600 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-30"></div>
      <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-300 rounded-full opacity-40"></div>
      <div className="absolute bottom-1/4 left-1/6 w-3 h-3 bg-blue-500 rounded-full opacity-20"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-slate-600 p-3 rounded-2xl">
                <Calendar className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Agendamento
              <br />
              de Serviço
            </h1>
            <p className="text-slate-300 text-lg">
              Preencha os dados para agendar
              <br />
              via WhatsApp
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl p-6 shadow-2xl">
            <div className="space-y-6">
              {/* Nome Completo */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <label className="text-gray-700 font-medium">Nome Completo</label>
                </div>
                <Input
                  placeholder="Digite seu nome completo"
                  value={formData.nome}
                  onChange={(e) => handleInputChange("nome", e.target.value)}
                  className="bg-gray-100 border-0 rounded-xl h-12 text-gray-700 placeholder:text-gray-500"
                />
              </div>

              {/* Telefone */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <label className="text-gray-700 font-medium">Telefone</label>
                </div>
                <Input
                  placeholder="(47) 99999-9999"
                  value={formData.telefone}
                  onChange={(e) => handleInputChange("telefone", e.target.value)}
                  className="bg-gray-100 border-0 rounded-xl h-12 text-gray-700 placeholder:text-gray-500"
                />
              </div>

              {/* Serviço Desejado */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5 text-gray-600" />
                  <label className="text-gray-700 font-medium">Serviço Desejado</label>
                </div>
                <Select value={formData.servico} onValueChange={(value) => handleInputChange("servico", value)}>
                  <SelectTrigger className="bg-gray-100 border-0 rounded-xl h-12 text-gray-700">
                    <SelectValue placeholder="Selecione o serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    {servicos.map((servico) => (
                      <SelectItem key={servico} value={servico}>
                        {servico}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Data e Horário */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <label className="text-gray-700 font-medium">Data</label>
                  </div>
                  <Input
                    type="date"
                    value={formData.data}
                    onChange={(e) => handleInputChange("data", e.target.value)}
                    className="bg-gray-100 border-0 rounded-xl h-12 text-gray-700"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <label className="text-gray-700 font-medium">Horário</label>
                  </div>
                  <Select value={formData.horario} onValueChange={(value) => handleInputChange("horario", value)}>
                    <SelectTrigger className="bg-gray-100 border-0 rounded-xl h-12 text-gray-700">
                      <SelectValue placeholder="Horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {horarios.map((horario) => (
                        <SelectItem key={horario} value={horario}>
                          {horario}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Observações */}
              <div>
                <label className="text-gray-700 font-medium block mb-2">Observações (Opcional)</label>
                <Textarea
                  placeholder="Alguma observação especial?"
                  value={formData.observacoes}
                  onChange={(e) => handleInputChange("observacoes", e.target.value)}
                  className="bg-gray-100 border-0 rounded-xl text-gray-700 placeholder:text-gray-500 min-h-[80px] resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleWhatsAppSend}
                  disabled={!isFormValid}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white rounded-xl h-12 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Enviar WhatsApp
                </Button>
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 border-0 rounded-xl h-12 font-medium"
                >
                  Limpar
                </Button>
              </div>
            </div>
          </div>

          {/* Footer Message */}
          <div className="text-center mt-6">
            <div className="flex items-center justify-center gap-2 text-slate-300">
              <Smartphone className="w-5 h-5" />
              <span>Você será redirecionado para o WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
